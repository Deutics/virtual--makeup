import cv2
from flask import Flask, render_template, Response, request, redirect

from Streamer.Streamer import Streamer
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor
from Features.ApplyMakeup.ApplyMakeup import ApplyMakeup


class MakeupRecommendationApp:
    def __init__(self):
        self._streamer = Streamer()
        self._landmarks_extractor = LandmarksExtractor()
        self._apply_makeup = ApplyMakeup()

        self.app = Flask(__name__)
        self.app.add_url_rule('/', view_func=self.index)
        self.app.add_url_rule('/video_feed', view_func=self.video_feed)
        self.app.add_url_rule('/recommendation', view_func=self.recommendation)
        self.app.add_url_rule('/recommendation_mask', view_func=self.recommendation_mask)
        self.app.add_url_rule('/recommendation_data', view_func=self.recommendation_data, methods=['POST'])

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

    def recommendation_data(self):
        lipstick_color = request.form.get("lipstick_color")
        lipstick_color = tuple(map(int, lipstick_color.strip("()").split(",")))
        reversed_color = lipstick_color[::-1]
        self._apply_makeup.lipstick_color = reversed_color

        return "Data Received"

    def generate_frames(self):
        # image weights
        alpha = 0.7
        beta = 0.3
        # initialize webcam
        self._streamer.initialize_streaming()

        while self._streamer.is_streaming:
            # get frames one by one
            frame = self._streamer.get_frame()

            # Extract landmarks
            landmarks = self._landmarks_extractor.extract_landmarks(frame)
            if landmarks and self._apply_makeup.lipstick_color:
                face_landmarks = landmarks[0]
                face_landmarks = face_landmarks.landmark
                # Apply makeup
                # frame = apply_makeup.apply_concealer(frame, face_landmarks, color, alpha, beta)
                # frame = apply_makeup.apply_blush(frame, face_landmarks, color, alpha, beta)
                frame = self._apply_makeup.apply_lipstick(frame, face_landmarks, self._apply_makeup.lipstick_color, alpha, beta)
                frame = self._apply_makeup.apply_eye_shade(frame, face_landmarks, self._apply_makeup.lipstick_color, 0.9, 0.1)
                # frame = apply_makeup.apply_foundation(frame, face_landmarks, color, alpha, beta)

            # Convert the frame to bytes and yield it to the response
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
