import threading
from app import MakeupRecommendationApp

if __name__ == '__main__':
    my_app = MakeupRecommendationApp()
    my_app.run(threaded=True)
