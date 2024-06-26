import time
from deepface import DeepFace
import base64
import cv2
import numpy as np
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from config import settings
from Streamer.Streamer import Streamer
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor
from Features.ApplyMakeup.MakeupApplier import MakeupApplier
from Features.ImageSaver.ImageSaver import ImageSaver, create_multiprocess_pool
from Utils.ThreadWithReturnValue import ThreadWithReturnValue

# for the makeup colors
colors = {
    "lipstick": (0, 0, 0),
    "eye_shade": (0, 0, 0),
    "blush": (0, 0, 0),
    "foundation": (0, 0, 0),
    "concealer": (0, 0, 0),
}


class MakeupRecommendationApp:
    def __init__(self, source=0):
        # self._streamer = Streamer(source=source)
        self._landmarks_extractor = LandmarksExtractor()
        self._apply_makeup = MakeupApplier()
        self._image_saver = ImageSaver()
        self._time = None

        # socket
        self.app = Flask(__name__, static_folder="./static")
        # self.app = Flask(__name__,template_folder='templates')
        self.app.config["SECRET_KEY"] = "secret!"
        self.socketio = SocketIO(self.app, async_mode="eventlet", cors_allowed_origins=settings.CORS_ALLOWED_ORIGINS)

        # # Routes
        self.app.route("/")(self.index)
        self.socketio.on("connect")(self.test_connect)
        self.socketio.on("image")(self.receive_image)
        self.app.add_url_rule('/recommendation_data', view_func=self.recommendation_data, methods=['POST'])
        self.app.add_url_rule('/get_person_race', view_func=self.get_person_race, methods=['POST'])
        self.app.add_url_rule('/start_ai', view_func=self.start_ai, methods=['POST'])

    def run(self):
        self.socketio.run(self.app, debug=settings.DEBUG, port=settings.SERVER_PORT, host=settings.SERVER_HOST)

    @staticmethod
    def index():
        return render_template('index.html')

    @staticmethod
    def base64_to_image(base64_string):
        try:
            base64_data = base64_string.split(",")[1]
            image_bytes = base64.b64decode(base64_data)
            image_array = np.frombuffer(image_bytes, dtype=np.uint8)
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            return image
        except:
            return None

    @staticmethod
    def encode_image(image):
        try:
            # check for image

            result, frame_encoded = cv2.imencode(".jpg", image)

            # Check if encoding was successful
            if not result:
                return None

            processed_img_data = base64.b64encode(frame_encoded).decode()
            b64_src = "data:image/jpg;base64,"
            processed_img_data = b64_src + processed_img_data
            return processed_img_data

        except:
            return None

    @staticmethod
    def test_connect():
        print("Connected")
        emit("my response", {"data": "Connected"})

    # To apply ai recommended makeup
    def start_ai(self):
        self._apply_makeup.recommend_makeup_colors()
        self.update_global_colors()
        return "MakeUp Applied"

    @staticmethod
    def get_rgb_color(color, index):
        if color is not None:
            color = tuple(map(int, color.strip("()").split(",")))
            colors[index] = color[::-1]

    # sends person's race
    def get_person_race(self):
        race = self._apply_makeup.person_race
        # Return a JSON response with the race information
        return jsonify({'race': race})

    def recommendation_data(self):
        self.get_rgb_color(request.form.get("lipstick_color"), "lipstick")
        self.get_rgb_color(request.form.get("eyeshadow_color"), "eye_shade")
        self.get_rgb_color(request.form.get("blush_color"), "blush")
        self.get_rgb_color(request.form.get("concealer_color"), "concealer")
        self.get_rgb_color(request.form.get("foundation_color"), "foundation")

        self._apply_makeup.makeup_items_data["concealer"]["color"] = colors["concealer"]
        self._apply_makeup.makeup_items_data["lipstick"]["color"] = colors["lipstick"]
        self._apply_makeup.makeup_items_data["eye_shade"]["color"] = colors["eye_shade"]
        self._apply_makeup.makeup_items_data["blush"]["color"] = colors["blush"]
        self._apply_makeup.makeup_items_data["foundation"]["color"] = colors["foundation"]

        return "Data Received"

    # receives image and then send processed image back
    def receive_image(self, image):

        image = self.base64_to_image(image)
        if image is not None:
            # cv2.imwrite("image.jpg", image)
            race = self.analyze_person_race_in_thread(image)
            print(race)
            self.socketio.emit("race", race)

    def apply_makeup(self, frame):
        face_landmarks = self._landmarks_extractor.extract_landmarks(frame)

        if face_landmarks:

            if self._apply_makeup.person_race is None or time.time() - self._time >= 30:
                self._apply_makeup.person_race = self.analyze_person_race_in_thread(frame)
                # self._apply_makeup.recommend_makeup_colors()
                # self.update_global_colors()
                # Thread(target=create_multiprocess_pool, args=(frame, colors)).start()
                self._time = time.time()

            frame = self._apply_makeup.apply_makeup_to_image(frame, face_landmarks)

        return frame

    @staticmethod
    def analyze_person_race_in_thread(frame):
        thread = ThreadWithReturnValue(target=analyze_person_race, args=(frame,))
        thread.start()
        return thread.join()

    def update_global_colors(self):
        ai_recommended_colors = self._apply_makeup.ai_recommended_colors()
        for item in ai_recommended_colors:
            colors[item] = ai_recommended_colors[item]


def analyze_person_race(frame):
    """*************************************
    Parameters: frame, apply_makeup(instance of class)
    Functionality: Analyze the race of person in frame
    ****************************************"""

    prediction = DeepFace.analyze(img_path=frame, actions=('race',), enforce_detection=False)[0]
    person_race = prediction['dominant_race']
    if person_race != "white" and person_race != "black":
        person_race = 'brown'
    return person_race
