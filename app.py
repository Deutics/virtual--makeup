from flask import Flask, render_template, Response
import cv2
import numpy as np
import mediapipe as mp

app = Flask(__name__)
camera = cv2.VideoCapture(0)
streaming = False

mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh
mp_drawing_styles = mp.solutions.drawing_styles


def apply_lipstick(image, face_landmarks, color=(0, 255, 0)):
    # Extract the x, y, and z coordinates of the landmarks corresponding to the lips
    lips_landmarks_upper = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308, 415, 310, 311, 312, 13,
                            82, 81, 80, 191, 78]
    lips_landmarks_lower = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
                            324, 318, 402, 317, 14, 87, 178, 88, 95, 78]
    # coords
    x_coords_upper, y_coords_upper, z_coords_upper = [], [], []
    x_coords_lower, y_coords_lower, z_coords_lower = [], [], []
    for landmark_idx in lips_landmarks_upper:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        z = landmark.z
        x_coords_upper.append(x)
        y_coords_upper.append(y)
        z_coords_upper.append(z)
    for landmark_idx in lips_landmarks_lower:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        z = landmark.z
        x_coords_lower.append(x)
        y_coords_lower.append(y)
        z_coords_lower.append(z)

    # Create a mask for the lips region
    mask = np.zeros_like(image)
    pts_upper = np.array([[(x_coords_upper[i], y_coords_upper[i]) for i in range(len(lips_landmarks_upper))]], np.int32)
    pts_lower = np.array([[(x_coords_lower[i], y_coords_lower[i]) for i in range(len(lips_landmarks_lower))]], np.int32)
    cv2.fillPoly(mask, pts_upper, (255, 255, 255))
    cv2.fillPoly(mask, pts_lower, (255, 255, 255))
    mask = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)

    # Apply the color filter to the lips region
    filtered_image = np.zeros_like(image)
    filtered_image[mask == 255] = color
    filtered_image = cv2.addWeighted(image, 1, filtered_image, 0.2, 1)

    return filtered_image


def apply_eyeshade(image, face_landmarks, color=(0, 255, 0)):
    # Extract the x, y, and z coordinates of the landmarks corresponding to the lips
    eyeshade_landmarks_left = [113, 225, 224, 223, 222, 221, 189, 244, 243,
                               173, 157, 158, 159, 160, 161, 246, 33, 130, 226]
    eyeshade_landmarks_right = [413, 441, 442, 443, 444, 445, 342, 359,
                                263, 466, 388, 387, 386, 385, 384, 414]
    # coords
    x_coords_upper, y_coords_upper, z_coords_upper = [], [], []
    x_coords_lower, y_coords_lower, z_coords_lower = [], [], []
    for landmark_idx in eyeshade_landmarks_left:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        z = landmark.z
        x_coords_upper.append(x)
        y_coords_upper.append(y)
        z_coords_upper.append(z)
    for landmark_idx in eyeshade_landmarks_right:
        landmark = face_landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        z = landmark.z
        x_coords_lower.append(x)
        y_coords_lower.append(y)
        z_coords_lower.append(z)

    # Create a mask for the lips region
    mask = np.zeros_like(image)
    pts_upper = np.array([[(x_coords_upper[i], y_coords_upper[i]) for i in range(len(eyeshade_landmarks_left))]],
                         np.int32)
    pts_lower = np.array([[(x_coords_lower[i], y_coords_lower[i]) for i in range(len(eyeshade_landmarks_right))]],
                         np.int32)
    cv2.fillPoly(mask, pts_upper, (255, 255, 255))
    cv2.fillPoly(mask, pts_lower, (255, 255, 255))
    mask = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)

    # Apply the color filter to the lips region
    filtered_image = np.zeros_like(image)
    filtered_image[mask == 255] = color
    filtered_image = cv2.addWeighted(image, 1, filtered_image, 0.2, 1)

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
                        frame = apply_lipstick(frame, face_landmarks.landmark, color=(0, 255, 0))
                        frame = apply_eyeshade(frame, face_landmarks.landmark, color=(0, 255, 0))

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
