from flask import Flask, render_template, Response
import cv2
import numpy as np
import mediapipe as mp
import copy

app = Flask(__name__)
camera = cv2.VideoCapture(0)
streaming = False

mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh
mp_drawing_styles = mp.solutions.drawing_styles

concealer_left_landmarks = [133, 243, 244, 128, 121, 120, 119, 118, 117, 111, 35, 226,
                            130, 163, 144, 145, 153, 154, 155]
concealer_right_landmarks = [362, 463, 464, 357, 350, 349, 348, 347, 346, 340, 263, 446, 359,
                             263, 249, 390, 373, 374, 380, 381, 382]

upper_lip_landmarks = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308, 415,
                       310, 311, 312, 13, 82, 81, 80, 191, 78]
lower_lip_landmarks = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
                       324, 318, 402, 317, 14, 87, 178, 88, 95, 78]


def apply_makeup(image, face_landmarks, landmarks_1, landmarks_2,  color):

    # coords
    x_coords_1, y_coords_1 = [], []
    x_coords_2, y_coords_2 = [], []
    for landmark_idx in landmarks_1:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_1.append(x)
        y_coords_1.append(y)
    for landmark_idx in landmarks_2:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_2.append(x)
        y_coords_2.append(y)
    mask = copy.deepcopy(image)
    pts_1 = np.array([[(x_coords_1[i], y_coords_1[i]) for i in range(len(landmarks_1))]], np.int32)
    pts_2 = np.array([[(x_coords_2[i], y_coords_2[i]) for i in range(len(landmarks_2))]], np.int32)
    cv2.fillPoly(mask, pts_1, color)
    cv2.fillPoly(mask, pts_2, color)
    filtered_image = cv2.addWeighted(image, 0.6, mask, 0.4, 0)

    return filtered_image


def gen_frames():
    global streaming
    with mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as face_mesh:
        while True:
            success, frame = camera.read()
            if not success or not streaming:
                break
            else:
                # Apply the face mesh to the frame.
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = face_mesh.process(image)
                if results.multi_face_landmarks:
                    for face_landmarks in results.multi_face_landmarks:
                        frame = apply_makeup(frame, face_landmarks.landmark,
                                             landmarks_1=upper_lip_landmarks, landmarks_2=lower_lip_landmarks,
                                             color=(128, 0, 128))

                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    global streaming
    streaming = True
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/stop_stream')
def stop_stream():
    global streaming
    streaming = False
    return "Stream stopped"


if __name__ == "__main__":
    app.run(debug=True)
