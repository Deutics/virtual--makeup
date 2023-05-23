from pathlib import Path
import os

import environ

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

env = environ.Env()
# Fetching
env_dir = os.path.join(BASE_DIR, "envs", ".env")
if os.path.exists(env_dir):
    environ.Env.read_env(env_dir)
