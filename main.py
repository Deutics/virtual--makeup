import threading
from app import MakeupRecommendationApp

if __name__ == '__main__':
    my_app = MakeupRecommendationApp(source=0)
    my_app.run(threaded=True)
