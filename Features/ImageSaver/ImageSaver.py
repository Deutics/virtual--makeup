import multiprocessing
import os
import cv2
import time
import copy
from Features.ApplyMakeup.ApplyMakeup import ApplyMakeup
from Features.LandmarksExtractor.LandmarksExtractor import LandmarksExtractor


def apply_lipstick(data):
    apply_makeup = ApplyMakeup()
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
    if os.path.exists(image_path):
        cv2.imwrite(os.path.join(image_path, '{}.jpg').format(combination), frame)
        cv2.waitKey(1)


class ImageSaver:
    def __init__(self, frame, color):
        self._image = frame
        self._color = color
        self._all_combinations = [(0.1, 0.9), (0.2, 0.8), (0.3, 0.7), (0.4, 0.6), (0.5, 0.5),
                                  (0.6, 0.4), (0.7, 0.3), (0.8, 0.2), (0.9, 0.1)]

        # Convert the timestamp to the desired format
        self._time_stamp = time.strftime('%d-%m-%Y\\%H-%M-%S', time.localtime(time.time()))

        self._processed_dict = self.process_combinations()

    def process_combinations(self):
        result = []

        for combination in self._all_combinations:
            alpha, beta = combination
            data = {
                'frame': self._image,
                'color': self._color,
                'timestamp': self._time_stamp,
                'alpha': alpha,
                'beta': beta
            }
            result.append(data)

        return result

    def store_image(self):
        pool = multiprocessing.Pool()
        pool.map(apply_lipstick, self._processed_dict)

        # pool.close()
        # # Create and start the worker processes
        # processes = [
        #     multiprocessing.Process(target=apply_lipstick, args=(data,))
        #     for i, data in enumerate(self._processed_dict)
        # ]
        # for process in processes:
        #     process.start()

