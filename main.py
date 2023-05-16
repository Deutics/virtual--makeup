import threading
from app import MakeupRecommendationApp


def main():
    my_app = MakeupRecommendationApp()
    my_app.run()


if __name__ == '__main__':
    thread = threading.Thread(target=main)
    thread.start()
