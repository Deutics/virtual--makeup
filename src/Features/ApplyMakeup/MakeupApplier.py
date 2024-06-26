import numpy as np
import cv2


class MakeupApplier:
    def __init__(self):
        self._person_race = None
        self._makeup_items_data = {"concealer": {"color": (0, 0, 0),
                                                 "landmarks_id": [[133, 243, 244, 128, 121, 120, 119, 118, 117, 111,
                                                                   35, 226, 130, 163, 144, 145, 153, 154, 155],
                                                                  [362, 463, 464, 357, 350, 349, 348, 347, 346, 340,
                                                                   265, 263, 446, 359, 263, 249, 390, 373, 374, 380,
                                                                   381, 382]],
                                                 "alpha": 0.95, "beta": 0.05},

                                   "lipstick": {"color": (0, 0, 0),
                                                "landmarks_id": [[61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308,
                                                                  415, 310, 311, 312, 13, 82, 81, 80, 191, 78],
                                                                 [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
                                                                  324, 318, 402, 317, 14, 87, 178, 88, 95, 78]],
                                                "alpha": 0.8, "beta": 0.2},

                                   "blush": {"color": (0, 0, 0),
                                             "landmarks_id": [[101, 117, 34, 227, 137, 207],
                                                              [330, 264, 366, 427]],
                                             "alpha": 0.95, "beta": 0.05},

                                   "foundation": {"color": (0, 0, 0),
                                                  "landmarks_id": [[251, 389, 356, 454, 323, 361, 288, 397, 365,
                                                                    379, 378, 400, 377, 152, 148, 176, 149, 150,
                                                                    136, 172, 58, 132, 127, 162, 21, 54, 103, 67, 109,
                                                                    10, 338, 297, 332, 284],
                                                                   [251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
                                                                    378, 400, 377, 152, 148, 176, 149, 150, 136, 172,
                                                                    58, 132, 127, 162, 21, 54, 103, 67, 109, 10, 338,
                                                                    297, 332, 284]],
                                                  "alpha": 0.95, "beta": 0.05},

                                   "eye_shade": {"color": (0, 0, 0),
                                                 "landmarks_id": [[226, 113, 225, 224, 223, 222, 221, 189, 244, 243,
                                                                   173, 157, 158, 159, 160, 161, 246, 130],
                                                                  [464, 413, 441, 442, 443, 444, 445, 342, 446, 263,
                                                                   466, 388, 387, 386, 384, 398, 362, 463]],
                                                 "alpha": 0.9, "beta": 0.1}
                                   }

        self._ai_colors_recommendations = {"white": {"lipstick": (95, 17, 224),
                                                     "eye_shade": (203, 192, 255),
                                                     "blush": (194, 194, 244),
                                                     "foundation": (212, 224, 248),
                                                     "concealer": (180, 229, 255)},

                                           "black": {"lipstick": (25, 25, 150),
                                                     "eye_shade": (28, 86, 174),
                                                     "blush": (107, 141, 205),
                                                     "foundation": (134, 166, 199),
                                                     "concealer": (134, 166, 199)},

                                           "brown": {"lipstick": (45, 4, 210),
                                                     "eye_shade": (107, 42, 187),
                                                     "blush": (86, 54, 219),
                                                     "foundation": (199, 211, 233),
                                                     "concealer": (140, 165, 210)},

                                           }

    def apply_makeup_to_image(self, image, face_landmarks):
        for key, data in self._makeup_items_data.items():
            mask = self._create_makeup_mask(image, face_landmarks,
                                            data["landmarks_id"],
                                            data["color"])
            # mask = cv2.GaussianBlur(mask, (7, 7), 20)

            image = cv2.addWeighted(image, data["alpha"],
                                    mask, data["beta"], 0)

        return image

    def apply_makeup_to_save(self, image, face_landmarks, features):

        for key, feature in features.items():
            mask = self._create_makeup_mask(image, face_landmarks,
                                            feature["landmarks_id"],
                                            feature["color"])

            image = cv2.addWeighted(image, feature["alpha"],
                                    mask, feature["beta"], 0)

        return image

    def add_race_in_frame(self, image):
        """***********************************
        Params: image
        Functions: add race txt to image
        **************************************"""
        # Calculate the position to add the text
        height, width, _ = image.shape
        center_x, center_y = width // 2, height // 2
        text_position = (center_x - 150, center_y - 120)

        image = cv2.putText(image, self._person_race, text_position, cv2.FONT_HERSHEY_SIMPLEX,
                            0.3, (0, 0, 0), 1, cv2.LINE_AA)
        return image

    @staticmethod
    def _create_makeup_mask(frame, face_landmarks, makeup_landmarks, color):
        """*********************************
        Params: frame, face_landmarks, makeup_landmarks, color
        Function: apply sent color to the frame with the landmarks received
        ************************************"""
        if color == (0, 0, 0):
            return frame

        mask = frame.copy()
        for i, landmark in enumerate(makeup_landmarks):
            points = np.array([[face_landmarks[idx].x * frame.shape[1], face_landmarks[idx].y * frame.shape[0]]
                               for idx in landmark], np.int32)

            cv2.fillPoly(mask, [points], color)

        return mask

    def recommend_makeup_colors(self):
        for items in self._makeup_items_data:
            self._makeup_items_data[items]["color"] = self._ai_colors_recommendations[self._person_race][items]

    def ai_recommended_colors(self):
        return self._ai_colors_recommendations[self._person_race]

    # Getter Setters
    @property
    def makeup_items_data(self):
        return self._makeup_items_data

    @makeup_items_data.setter
    def makeup_items_data(self, data):
        self._makeup_items_data = data

    @property
    def person_race(self):
        return self._person_race

    @person_race.setter
    def person_race(self, race):
        self._person_race = race

    @person_race.setter
    def person_race(self, race):
        self._person_race = race

