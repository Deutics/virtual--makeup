from flask import Flask, render_template, Response, request, redirect
from streamer import Streamer
from landmarks_extractor import LandmarksExtractor
from apply_makeup import ApplyMakeup

import cv2


streamer = Streamer()
landmarks_extractor = LandmarksExtractor()
apply_makeup = ApplyMakeup()


class MakeupRecommendationApp:
    def __init__(self):
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

    @staticmethod
    def video_feed():
        return Response(generate_frames(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')

    @staticmethod
    def recommendation():
        return render_template('recommendation.html')

    @staticmethod
    def recommendation_mask():
        return redirect('/recommendation')

    @staticmethod
    def recommendation_data():
        lipstick_color = request.form.get("lipstick_color")
        lipstick_color = tuple(map(int, lipstick_color.strip("()").split(",")))
        reversed_color = lipstick_color[::-1]
        apply_makeup.lipstick_color = reversed_color

        return "Data Recieved"

def generate_frames():

    # image weights
    alpha = 0.7
    beta = 0.3
    # initialize webcam
    streamer.initialize_streaming()
    while True:
        if streamer.streaming:
            # get frames one by one
            frame = streamer.get_frame()

            # Extract landmarks
            landmarks = landmarks_extractor.extract_landmarks(frame)
            if landmarks and apply_makeup.lipstick_color:
                face_landmarks = landmarks[0]
                face_landmarks = face_landmarks.landmark
                # Apply makeup
                # frame = apply_makeup.apply_concealer(frame, face_landmarks, color, alpha, beta)
                # frame = apply_makeup.apply_blush(frame, face_landmarks, color, alpha, beta)
                frame = apply_makeup.apply_lipstick(frame, face_landmarks, apply_makeup.lipstick_color, alpha, beta)
                frame = apply_makeup.apply_eye_shade(frame, face_landmarks, apply_makeup.lipstick_color, 0.9, 0.1)
                # frame = apply_makeup.apply_foundation(frame, face_landmarks, color, alpha, beta)

            # Convert the frame to bytes and yield it to the response
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')