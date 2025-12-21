from flask import Flask
from models import engine, session, Base, Dancer, DanceStyle, User
from routes import register_routes
from auth import register_auth_routes
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Type", "Authorization"]
    }
})

@app.route('/')
def home():
    return ("Flask started")

register_routes(app)
register_auth_routes(app)


if __name__ == '__main__':
    app.run(debug=True)
