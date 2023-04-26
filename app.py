

from flask import Flask, render_template, Response, redirect, request
from streamer import Streamer
from landmarks_extractor import LandmarksExtractor
from apply_makeup import ApplyMakeup
import cv2

app = Flask(__name__)

streamer = Streamer()
landmarks_extractor = LandmarksExtractor()
apply_makeup = ApplyMakeup()


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


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/stop_stream')
def stop_stream():
    streamer.stop_streaming()
    return 'Stopped streaming'


@app.route('/recommendation')
def recommendation():
    return render_template('recommendation.html')


@app.route('/recommendation_mask')
def recommendation_mask():
    return redirect('/recommendation')


@app.route('/recommendation_data', methods=['POST'])
def recommendation_data():
    lipstick_color = request.form.get("lipstick_color")
    lipstick_color = tuple(map(int, lipstick_color.strip("()").split(",")))
    reversed_color = lipstick_color[::-1]
    apply_makeup.lipstick_color = reversed_color

    return "Data Recieved"


if __name__ == '__main__':
    app.run(debug=True)
