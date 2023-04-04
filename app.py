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

# applying lipstick to face
def apply_lip(image, landmarks, color=(0, 255, 0)):
    # Extract the x and y coordinates of the landmarks corresponding to the lips
    lips_landmarks_upper = [61, 185, 40, 39, 37, 0, 267, 270, 409, 291]
    lips_landmarks_lower = [61, 146, 84, 17, 314, 405, 321, 375, 291]

    x_coords_upper, y_coords_upper = [], []
    x_coords_lower, y_coords_lower = [], []
    for landmark_idx in lips_landmarks_upper:
        landmark = landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_upper.append(x)
        y_coords_upper.append(y)
    for landmark_idx in lips_landmarks_lower:
        landmark = landmarks[landmark_idx]
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_lower.append(x)
        y_coords_lower.append(y)

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
    filtered_image = cv2.addWeighted(image, 1, filtered_image, 0.5, 0)

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
                        # mp_drawing.draw_landmarks(
                        #     image=frame,
                        #     landmark_list=face_landmarks,
                        #     connections=mp_face_mesh.FACEMESH_TESSELATION,
                        #     landmark_drawing_spec=None,
                        #     connection_drawing_spec=mp_drawing_styles
                        #     .get_default_face_mesh_tesselation_style())
                        # mp_drawing.draw_landmarks(
                        #     image=frame,
                        #     landmark_list=face_landmarks,
                        #     connections=mp_face_mesh.FACEMESH_CONTOURS,
                        #     landmark_drawing_spec=None,
                        #     connection_drawing_spec=mp_drawing_styles
                        #     .get_default_face_mesh_contours_style())
                        # mp_drawing.draw_landmarks(
                        #     image=frame,
                        #     landmark_list=face_landmarks,
                        #     connections=mp_face_mesh.FACEMESH_IRISES,
                        #     landmark_drawing_spec=None,
                        #     connection_drawing_spec=mp_drawing_styles
                        #     .get_default_face_mesh_iris_connections_style())
                        # for idx, landmark in enumerate(face_landmarks.landmark):
                        #     x = int(landmark.x * image.shape[1])
                        #     y = int(landmark.y * image.shape[0])
                            # cv2.putText(frame, str(idx), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 255, 0), 1,
                            #             cv2.LINE_AA)
                        filtered_image = apply_lip(frame, face_landmarks.landmark, color=(255,0,0))
                        frame = cv2.cvtColor(filtered_image, cv2.COLOR_BGR2RGB)

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
