import cv2
from flask import Flask, render_template, Response, request, redirect
import time
from threading import Thread
from deepface import DeepFace

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

        self.app = Flask(__name__)
        self.app.add_url_rule('/', view_func=self.index)
        self.app.add_url_rule('/video_feed', view_func=self.video_feed)
        self.app.add_url_rule('/recommendation', view_func=self.recommendation)
        self.app.add_url_rule('/recommendation_mask', view_func=self.recommendation_mask)
        self.app.add_url_rule('/recommendation_data', view_func=self.recommendation_data, methods=['POST'])
        self.app.add_url_rule('/stop_camera', view_func=self.stop_streaming, methods=['POST'])
        self.app.add_url_rule('/get_person_race', view_func=self.get_person_race)

    def run(self, *args, **kwargs):
        self.app.run(*args, **kwargs)

    @staticmethod
    def index():
        return render_template('index.html')

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

                    Thread(target=create_multiprocess_pool, args=(frame, colors)).start()

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
