import multiprocessing

import os

import cv2

from Features.ApplyMakeup.ApplyMakeup import ApplyMakeup


class ImageSaver:
    def __init__(self, frame, color, face_landmarks):
        self._image = frame
        self._color = color
        self._all_combinations = [(0.1, 0.9), (0.2, 0.8), (0.3, 0.7), (0.4, 0.6), (0.5, 0.5),
                                  (0.6, 0.4), (0.7, 0.3), (0.8, 0.2), (0.9, 0.1)]

        self._face_landmarks = face_landmarks
        self._apply_makeup = ApplyMakeup()

    def store_image(self):
        pool = multiprocessing.Pool()
        pool.map(self.apply_color, self._all_combinations)
        pool.close()

    @staticmethod
    def save_image(frame, image_path, combination):
        if not os.path.exists(image_path):
            os.makedirs(image_path)

        cv2.imwrite(os.path.join(image_path, '{}.jpg').format(combination), frame)
        cv2.waitKey(1)

    def apply_color(self, combination):
        frame = self._apply_makeup.apply_lipstick(image=self._image, face_landmarks=self._face_landmarks,
                                                  color=self._color, alpha=combination[0], beta=combination[1])

        self.save_image(frame=frame, image_path="Outputs\\Lipstick", combination=combination)

