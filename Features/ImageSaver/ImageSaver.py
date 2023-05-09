import multiprocessing
import os
import cv2
import time
import copy
from Features.ApplyMakeup.MakeupApplier import MakeupApplier
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor


class ImageSaver:
    def __init__(self):
        self._frame = None
        self._color = None
        self._time_stamp = None
        self._processed_dict = None

        self._all_combinations = [(0.1, 0.9), (0.2, 0.8), (0.3, 0.7), (0.4, 0.6), (0.5, 0.5),
                                  (0.6, 0.4), (0.7, 0.3), (0.8, 0.2), (0.9, 0.1)]

    def _prepare_data_combinations(self, data):
        resultant_combinations = []

        for combination in self._all_combinations:
            alpha, beta = combination
            data = {
                'frame': self._frame,
                'color': self._color,
                'timestamp': self._time_stamp,
                'alpha': alpha,
                'beta': beta
            }
            resultant_combinations.append(data)

        return resultant_combinations

    def create_multiprocess_pool(self, frame, data):
        self._initialize_items(frame, data)
        # create pool
        pool = multiprocessing.Pool()
        pool.map(apply_lipstick, self._processed_dict)

    def _initialize_items(self, frame, data):
        self._frame = frame
        self._time_stamp = time.strftime('%d-%m-%Y\\%H-%M-%S', time.localtime(time.time()))
        self._processed_dict = self._prepare_data_combinations(data)


# Global Functions
def apply_lipstick(data):
    apply_makeup = MakeupApplier()
    # Extract landmarks
    landmarks = LandmarksExtractor().extract_landmarks(data['frame'])
    face_landmarks = landmarks[0]
    face_landmarks = face_landmarks.landmark
    frame = apply_makeup.apply_lipstick(image=copy.deepcopy(data['frame']), face_landmarks=face_landmarks,
                                        color=data['color'], alpha=data['alpha'], beta=data['beta'])

    save_image(frame=frame, image_path="Outputs\\{}\\Lipstick".format(data['timestamp']),
               combination=(data['alpha'], data['beta']))


def save_image(frame, image_path, combination):
    if not os.path.exists(image_path):
        os.makedirs(image_path)
    cv2.imwrite(os.path.join(image_path, '{}.jpg').format(combination), frame)
