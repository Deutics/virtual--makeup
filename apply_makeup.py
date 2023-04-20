import copy
import numpy as np
import cv2


def apply_color(image, face_landmarks,  landmarks_1, landmarks_2, color):

    # coords
    x_coords_1, y_coords_1 = [], []
    x_coords_2, y_coords_2 = [], []
    for landmark_idx in landmarks_1:
        landmark = face_landmarks[landmark_idx]
        # landmarks coordinates
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_1.append(x)
        y_coords_1.append(y)
    for landmark_idx in landmarks_2:
        landmark = face_landmarks[landmark_idx]
        # landmarks coordinates
        x = int(landmark.x * image.shape[1])
        y = int(landmark.y * image.shape[0])
        x_coords_2.append(x)
        y_coords_2.append(y)
    mask = copy.deepcopy(image)
    pts_1 = np.array([[(x_coords_1[i], y_coords_1[i]) for i in range(len(landmarks_1))]], np.int32)
    pts_2 = np.array([[(x_coords_2[i], y_coords_2[i]) for i in range(len(landmarks_2))]], np.int32)
    cv2.fillPoly(mask, pts_1, color)
    cv2.fillPoly(mask, pts_2, color)

    return mask


class ApplyMakeup:
    def __init__(self):
        self.lipstick_color = None

        self.left_concealer_landmarks = [133, 243, 244, 128, 121, 120, 119, 118, 117, 111,
                                         35, 226, 130, 163, 144, 145, 153, 154, 155]
        self.right_concealer_landmarks = [362, 463, 464, 357, 350, 349, 348, 347, 346, 340, 265,
                                          263, 446, 359, 263, 249, 390, 373, 374, 380, 381, 382]

        self.upper_lip_landmarks = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 308, 415,
                                    310, 311, 312, 13, 82, 81, 80, 191, 78]
        self.lower_lip_landmarks = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
                                    324, 318, 402, 317, 14, 87, 178, 88, 95, 78]

        self.left_blush_landmarks = [101, 117, 34, 227, 137, 207]
        self.right_blush_landmarks = [330, 264, 366, 427]
        self.foundation_landmarks = [251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
                                     378, 400, 377, 152, 148, 176, 149, 150, 136, 172,
                                     58, 132, 127, 162, 21, 54, 103, 67, 109, 10, 338,
                                     297, 332, 284]
        self.right_eye_shade_landmarks = [464, 413, 441, 442, 443, 444, 445, 342, 446,
                                          263, 466, 388, 387, 386, 384, 398, 362, 463]
        self.left_eye_shade_landmarks = [226, 113, 225, 224, 223, 222, 221, 189, 244, 243,
                                         173, 157, 158, 159, 160, 161, 246, 130]

    def apply_concealer(self, image, face_landmarks, color, alpha, beta):
        mask = apply_color(image, face_landmarks, self.left_concealer_landmarks, self.right_concealer_landmarks, color)
        filtered_image = cv2.addWeighted(image, alpha, mask, beta, 0)

        return filtered_image

    def apply_lipstick(self, image, face_landmarks, color, alpha, beta):
        mask = apply_color(image, face_landmarks, self.lower_lip_landmarks, self.upper_lip_landmarks, color)
        filtered_image = cv2.addWeighted(image, alpha, mask, beta, 0)

        return filtered_image

    def apply_blush(self, image, face_landmarks, color, alpha, beta):
        mask = apply_color(image, face_landmarks, self.left_blush_landmarks, self.right_blush_landmarks, color)
        filtered_image = cv2.addWeighted(image, alpha, mask, beta, 0)

        return filtered_image

    def apply_eye_shade(self, image, face_landmarks, color, alpha, beta):
        mask = apply_color(image, face_landmarks, self.left_eye_shade_landmarks, self.right_eye_shade_landmarks, color)
        filtered_image = cv2.addWeighted(image, alpha, mask, beta, 0)

        return filtered_image

    # def apply_foundation(self, image, face_landmarks, color, alpha, beta):
    #     mask = apply_color(image, face_landmarks, self.foundation_landmarks, self.foundation_landmarks, color)
    #     filtered_image = cv2.addWeighted(image, alpha, mask, beta, 0)
    #
    #     return filtered_image

