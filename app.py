import time
from deepface import DeepFace
import base64
import os
import cv2
import numpy as np
from flask import Flask, render_template, send_from_directory,request,redirect,Response
from flask_socketio import SocketIO, emit

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
        self._streamer = Streamer(source=source)
        self._landmarks_extractor = LandmarksExtractor()
        self._apply_makeup = MakeupApplier()
        self._image_saver = ImageSaver()
        self._time = None

        self.app = Flask(__name__, static_folder="./static")
        self.app.config["SECRET_KEY"] = "secret!"
        self.socketio = SocketIO(self.app, async_mode="eventlet")
        # # Routes
        self.app.route("/")(self.index)
        self.socketio.on("connect")(self.test_connect)
        self.socketio.on("image")(self.receive_image)

        self.app.add_url_rule('/video_feed', view_func=self.video_feed)
        self.app.add_url_rule('/recommendation', view_func=self.recommendation)
        self.app.add_url_rule('/recommendation_mask', view_func=self.recommendation_mask)
        self.app.add_url_rule('/recommendation_data', view_func=self.recommendation_data, methods=['POST'])
        self.app.add_url_rule('/stop_camera', view_func=self.stop_streaming, methods=['POST'])
        self.app.add_url_rule('/get_person_race', view_func=self.get_person_race)

    # def run(self, *args, **kwargs):
    #     self.app.run(*args, **kwargs)
    def run(self):
        self.socketio.run(self.app, debug=True, port=5000)
        # self.app.run()

    @staticmethod
    def index():
        return render_template('index.html')

    @staticmethod
    def base64_to_image(base64_string):
        base64_data = base64_string.split(",")[1]
        image_bytes = base64.b64decode(base64_data)
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        return image

    @staticmethod
    def encode_image(image):
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
        result, frame_encoded = cv2.imencode(".jpg", image, encode_param)
        processed_img_data = base64.b64encode(frame_encoded).decode()
        b64_src = "data:image/jpg;base64,"
        processed_img_data = b64_src + processed_img_data
        return processed_img_data

    def test_connect(self):
        print("Connected")
        emit("my response", {"data": "Connected"})


    def video_feed(self):
        return Response(self.generate_frames(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')

    @staticmethod
    def recommendation():
        return render_template('recommendation.html')

    @staticmethod
    def recommendation_mask():
        return redirect('/recommendation')

    @staticmethod
    def get_rgb_color(color, index):
        if color is not None:
            color = tuple(map(int, color.strip("()").split(",")))
            colors[index] = color[::-1]

    def get_person_race(self):
        """
        :return: send person race to HTML
        """
        return self._apply_makeup.person_race

    def recommendation_data(self):
        self.get_rgb_color(request.form.get("lipstick_color"), "lipstick")
        self.get_rgb_color(request.form.get("eyeshadow_color"), "eye_shade")
        self.get_rgb_color(request.form.get("blush_color"), "blush")
        self.get_rgb_color(request.form.get("concealer_color"), "concealer")
        self.get_rgb_color(request.form.get("foundation_color"), "foundation")

        self._apply_makeup.makeup_items_data["Concealer"]["color"] = colors["concealer"]
        self._apply_makeup.makeup_items_data["Lipstick"]["color"] = colors["lipstick"]
        self._apply_makeup.makeup_items_data["Eye_shade"]["color"] = colors["eye_shade"]
        self._apply_makeup.makeup_items_data["Blush"]["color"] = colors["blush"]
        self._apply_makeup.makeup_items_data["Foundation"]["color"] = colors["foundation"]

        return "Data Received"

    def stop_streaming(self):
        self._streamer.stop_streaming()
        return "Stop Streaming"

    def receive_image(self, image):
        image = self.base64_to_image(image)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # frame_resized = cv2.resize(gray, (640, 360))
        processed_img_data = self.encode_image(gray)
        self.socketio.emit("processed_image", processed_img_data)


    def generate_frames(self):
        self._streamer.initialize_streaming()

        while self._streamer.is_streaming:
            if self._time is None:
                self._time = time.time()

            frame = self._streamer.get_frame()
            face_landmarks = self._landmarks_extractor.extract_landmarks(frame)

            if face_landmarks:
                if not self._apply_makeup.person_race:      # for 1 time only
                    self._apply_makeup.person_race = analyze_person_race(frame)

                if (time.time() - self._time) >= 30:

                    self._apply_makeup.person_race = self.analyze_person_race_in_thread(frame)

                    # Thread(target=create_multiprocess_pool, args=(frame, colors)).start()

                    self._time = None

                frame = self._apply_makeup.apply_makeup_to_image(frame, face_landmarks)

            # Convert the frame to bytes and yield it to the response
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    @staticmethod
    def analyze_person_race_in_thread(frame):
        thread = ThreadWithReturnValue(target=analyze_person_race, args=(frame,))
        thread.start()
        return thread.join()


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

