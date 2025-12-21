from flask import Flask
from models import engine, session, Base, Dancer, DanceStyle, User
from routes import register_routes
from auth import register_auth_routes
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization"]}}, supports_credentials=True)

@app.route('/')
def home():
    return ("Flask started")

register_routes(app)
register_auth_routes(app)


if __name__ == '__main__':
    app.run(debug=True)
