from flask import Flask, jsonify
from models import engine, session, Base, Dancer, DanceStyle, User
from routes import register_routes

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Dancers API', 'endpoints': ['/api/dancers', '/api/dancers/<id>']})

# Registering the routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
