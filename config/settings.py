from . import env

DEBUG = env.bool("FLASK_DEBUG", default=True)
SERVER_HOST = env.str("FLASK_SERVER_HOST", default="127.0.0.1")
SERVER_PORT = env.int("FLASK_SERVER_PORT", default=5000)
