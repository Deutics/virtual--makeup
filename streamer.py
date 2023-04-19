import cv2


class Streamer:
    def __init__(self):
        self.streaming = True
        self.web_stream = None

    def initialize_streaming(self):
        self.streaming = True
        self.web_stream = cv2.VideoCapture(0)

    def stop_streaming(self):
        # if self.camera is not None:
        if self.web_stream is not None:
            self.web_stream.release()
        self.streaming = False

    def get_frame(self):
        if not self.streaming:
            return None
        ret, frame = self.web_stream.read()
        return frame

