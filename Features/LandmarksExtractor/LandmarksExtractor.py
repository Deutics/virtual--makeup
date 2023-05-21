import cv2
import mediapipe as mp


class LandmarksExtractor:
    def __init__(self):
        self.face_mesh = mp.solutions.face_mesh.FaceMesh()

    def extract_landmarks(self, frame):
        # Convert the image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the image and find the face landmarks
        results = self.face_mesh.process(image)
        landmarks = results.multi_face_landmarks
        face_landmarks = None

        if landmarks:           # find face landmarks
            face_landmarks = landmarks[0].landmark

        return face_landmarks
