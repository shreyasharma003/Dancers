from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models import session, User

SECRET_KEY = "53074238419950057717466071969018171246"

def generate_token(user_id, email):
    """Generate JWT token that expires in 3 hours"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(hours=1),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def token_required(f):
    """Decorator to protect routes with JWT authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Get token from Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                # Extract token from "Bearer <token>"
                token = auth_header.split(' ')[1]
            except IndexError:
                print(f"Invalid token format: {auth_header}")
                return jsonify({'error': 'Invalid token format. Use: Bearer <token>'}), 401
        
        if not token:
            print("No token found in headers")
            return jsonify({'error': 'Token is missing. Please login first.'}), 401
        
        try:
            # Decode and validate token
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = session.query(User).filter_by(user_id=payload['user_id']).first()
            
            if not current_user:
                print(f"User not found for user_id: {payload['user_id']}")
                return jsonify({'error': 'Invalid token. User not found.'}), 401
                
        except jwt.ExpiredSignatureError:
            print("Token expired")
            return jsonify({'error': 'Token has expired. Please login again.'}), 401
        except jwt.InvalidTokenError as e:
            print(f"Invalid token error: {str(e)}")
            return jsonify({'error': 'Invalid token. Please login again.'}), 401
        
        # Pass current_user to the route
        return f(current_user, *args, **kwargs)
    
    return decorated

def signup():
    """User signup route - simple version without authentication"""
    data = request.get_json()
    
   
    if not data or not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({'error': 'Missing required fields: name, email, password'}), 400
    
    try:
    
        existing_user = session.query(User).filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'error': 'User with this email already exists'}), 409
        
   
        max_id = session.query(User).order_by(User.user_id.desc()).first()
        new_id = (max_id.user_id + 1) if max_id else 1
        
        # Hash the password
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
       
        new_user = User(
            user_id=new_id,
            email=data['email'],
            user_name=data['name'],
            role=data.get('role', 'user'),
            password=hashed_password
        )
        
        session.add(new_user)
        session.commit()
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'user_id': new_user.user_id,
                'email': new_user.email,
                'name': new_user.user_name,
                'role': new_user.role
            }
        }), 201
        
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400

def login():
    """User login route with JWT token generation"""
    data = request.get_json()
    
    # Validate required fields
    if not data or not all(k in data for k in ('email', 'password')):
        return jsonify({'error': 'Missing required fields: email, password'}), 400
    
    try:
     
        user = session.query(User).filter_by(email=data['email']).first()
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
      
        if not check_password_hash(user.password, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
       
        token = generate_token(user.user_id, user.email)
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'user_id': user.user_id,
                'email': user.email,
                'name': user.user_name,
                'role': user.role
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def get_profile(current_user):
    """Protected route example - Get user profile"""
    return jsonify({
        'message': 'Profile accessed successfully',
        'user': {
            'user_id': current_user.user_id,
            'email': current_user.email,
            'name': current_user.user_name,
            'role': current_user.role
        }
    }), 200

def register_auth_routes(app):
    """Register authentication routes"""
    
    @app.route('/api/auth/signup', methods=['POST'])
    def signup_route():
        return signup()
    
    @app.route('/api/auth/login', methods=['POST'])
    def login_route():
        return login()
    
    @app.route('/api/auth/profile', methods=['GET'])
    @token_required
    def profile_route(current_user):
        return get_profile(current_user)
