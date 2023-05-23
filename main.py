import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent
sys.path.append(str(BASE_DIR / "src"))
from src.app import MakeupRecommendationApp

my_app = MakeupRecommendationApp(source=0)

if __name__ == '__main__':
    my_app.run()
