import cv2


class Streamer:
    def __init__(self, source=0):
        self._is_streaming = False
        self._web_stream = None
        self._source = source

    def initialize_streaming(self):
        self._is_streaming = True
        self._web_stream = cv2.VideoCapture(self._source)

    def stop_streaming(self):
        # if self.camera is not None:
        if self._web_stream is not None:
            self._web_stream.release()
        self._is_streaming = False

    def get_frame(self):
        if not self._is_streaming:
            return 0
        _, frame = self._web_stream.read()
        return frame

    # Getter Setters
    @property
    def is_streaming(self):
        return self._is_streaming

    @is_streaming.setter
    def is_streaming(self, x):
        self._is_streaming = x
