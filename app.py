import cv2
from flask import Flask, render_template, Response, request, redirect
import time
# import multiprocessing
import threading
from deepface import DeepFace

from Streamer.Streamer import Streamer
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor
from Features.ApplyMakeup.MakeupApplier import MakeupApplier
from Features.ImageSaver.ImageSaver import ImageSaver, create_multiprocess_pool

colors = {
    "lipstick": (0, 0, 0),
    "eye_shade": (0, 0, 0),
    "blush": (0, 0, 0),
    "foundation": (0, 0, 0),
    "concealer": (0, 0, 0),
}


class MakeupRecommendationApp:
    def __init__(self):
        self._streamer = Streamer()
        self._landmarks_extractor = LandmarksExtractor()
        self._apply_makeup = MakeupApplier()
        self._image_saver = ImageSaver()
        self._person_race = None
        self.app = Flask(__name__)
        self.app.add_url_rule('/', view_func=self.index)
        self.app.add_url_rule('/video_feed', view_func=self.video_feed)
        self.app.add_url_rule('/recommendation', view_func=self.recommendation)
        self.app.add_url_rule('/recommendation_mask', view_func=self.recommendation_mask)
        self.app.add_url_rule('/recommendation_data', view_func=self.recommendation_data, methods=['POST'])
        # New
        self.app.add_url_rule('/stop_camera', view_func=self.stop_streaming, methods=['POST'])
        #
        self._time = None

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

    def recommendation_data(self):
        self.get_rgb_color(request.form.get("lipstick_color"), "lipstick")
        self.get_rgb_color(request.form.get("eyeshadow_color"), "eye_shade")
        self.get_rgb_color(request.form.get("blush_color"), "blush")
        self.get_rgb_color(request.form.get("concealer_color"), "concealer")
        self.get_rgb_color(request.form.get("foundation_color"), "foundation")

        # print(colors)
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

        # initialize webcam
        self._streamer.initialize_streaming()

        while self._streamer.is_streaming:
            # initializing timer for saving images
            if self._time is None:
                self._time = time.time()

            # get frames one by one
            frame = self._streamer.get_frame()

            # Extract landmarks
            landmarks = self._landmarks_extractor.extract_landmarks(frame)

            if landmarks:
                face_landmarks = landmarks[0].landmark
                if not self._person_race:
                    prediction = DeepFace.analyze(img_path=frame, actions=('race',), enforce_detection=False)
                    self._person_race = prediction[0]['dominant_race']
                    print(self._person_race)

                if (time.time() - self._time) >= 30:

                    prediction = DeepFace.analyze(img_path=frame, actions=('race',), enforce_detection=False)
                    self._person_race = prediction[0]['dominant_race']

                    process = threading.Thread(target=create_multiprocess_pool,
                                               args=(frame, colors))
                    # Start the process
                    process.start()
                    self._time = None

                # Apply makeup
                frame = self._apply_makeup.apply_makeup_to_image(frame, face_landmarks)

            # Convert the frame to bytes and yield it to the response
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
