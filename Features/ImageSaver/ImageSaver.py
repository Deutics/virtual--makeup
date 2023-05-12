import multiprocessing
import os
import uuid

import cv2
import time
import copy
from Features.ApplyMakeup.MakeupApplier import MakeupApplier
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor


class ImageSaver:
    def __init__(self):
        self._frame = None
        self._time_stamp = None
        self.processed_dict = None

        self._all_combinations = [(0.1, 0.9), (0.2, 0.8), (0.3, 0.7), (0.4, 0.6), (0.5, 0.5),
                                  (0.6, 0.4), (0.7, 0.3), (0.9, 0.1), (0.8, 0.2)]

    def _prepare_data_combinations(self, colors):

        resultant_combinations = []
        for key, color in colors.items():
            for combination in self._all_combinations:
                makeup = MakeupApplier()
                if color == (0, 0, 0):
                    break
                makeup.makeup_items_data[key.capitalize()]["color"] = color
                makeup.makeup_items_data[key.capitalize()]["alpha"], \
                    makeup.makeup_items_data[key.capitalize()]["beta"] = combination
                temp = {
                    'feature': key.capitalize(),
                    'frame': self._frame,
                    'timestamp': self._time_stamp,
                    'data': makeup.makeup_items_data,
                    'alpha': combination[0],
                    'beta': combination[1]
                }
                resultant_combinations.append(temp)
        return resultant_combinations

    def initialize_items(self, frame, data):
        self._frame = frame
        self._time_stamp = time.strftime('%d-%m-%Y\\%H-%M-%S', time.localtime(time.time()))
        self.processed_dict = self._prepare_data_combinations(data)


def create_multiprocess_pool(frame, data):
    image_saver = ImageSaver()

    image_saver.initialize_items(frame, data)
    # create pool
    pool = multiprocessing.Pool()
    pool.map(apply_makeup, image_saver.processed_dict)
    pool.close()


# Global Functions
def apply_makeup(data):
    makeup = MakeupApplier()
    # Extract landmarks
    landmarks = LandmarksExtractor().extract_landmarks(data['frame'])
    face_landmarks = landmarks[0]
    face_landmarks = face_landmarks.landmark
    frame = makeup.apply_makeup_to_save(image=copy.deepcopy(data['frame']), face_landmarks=face_landmarks,
                                        features=data['data'])

    save_image(frame=frame, image_path="Outputs\\{}\\{}".format(data['timestamp'], data['feature']),
               combination=(data['alpha'], data['beta']))


def save_image(frame, image_path, combination):
    if not os.path.exists(image_path):
        os.makedirs(image_path)
    unique_id = str(uuid.uuid4())[:8]
    cv2.imwrite(os.path.join(image_path, '{}.jpg').format(str(combination) + str(uuid.uuid4())[:4]), frame)
