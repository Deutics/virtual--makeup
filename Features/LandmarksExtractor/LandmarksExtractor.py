import cv2
import mediapipe as mp


class LandmarksExtractor:
    def __init__(self):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_face_mesh = mp.solutions.face_mesh
        self.mp_drawing_styles = mp.solutions.drawing_styles
        self.face_mesh = self.mp_face_mesh.FaceMesh()
        self.drawing_spec = self.mp_drawing.DrawingSpec(thickness=1, circle_radius=1)

    def extract_landmarks(self, frame):
        # Convert the image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the image and find the face landmarks
        results = self.face_mesh.process(image)
        landmarks = results.multi_face_landmarks
        if landmarks:
            landmarks = landmarks[0].landmark
        else:
            landmarks = None

        return landmarks
