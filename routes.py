from flask import jsonify, request
from models import session, Dancer, DanceStyle
from datetime import datetime

def get_all_dancers():
    dancers = session.query(Dancer).all()
    result = []
    for dancer in dancers:
        result.append({
            'id': dancer.id,
            'name': dancer.name,
            'email': dancer.email,
            'joining_date': str(dancer.joining_date),
            'salary': float(dancer.salary),
            'style_id': dancer.style_id,
            'style_name': dancer.style.style_name if dancer.style else None
        })
    return jsonify(result)

def search_dancer(search_param):
    # Try to search by ID if search_param is numeric
    if search_param.isdigit():
        dancer = session.query(Dancer).filter_by(id=int(search_param)).first()
    else:
        # Search by name (case-insensitive)
        dancer = session.query(Dancer).filter(Dancer.name.ilike(f'%{search_param}%')).first()
    
    if not dancer:
        return jsonify({'error': 'Dancer not found'}), 404
    
    return jsonify({
        'id': dancer.id,
        'name': dancer.name,
        'email': dancer.email,
        'joining_date': str(dancer.joining_date),
        'salary': float(dancer.salary),
        'style_id': dancer.style_id,
        'style_name': dancer.style.style_name if dancer.style else None
    })

def get_dancers_by_style(style_id):
    dancers = session.query(Dancer).filter_by(style_id=style_id).all()
    if not dancers:
        return jsonify({'message': 'No dancers found for this style'}), 404
    
    result = []
    for dancer in dancers:
        result.append({
            'id': dancer.id,
            'name': dancer.name,
            'email': dancer.email,
            'joining_date': str(dancer.joining_date),
            'salary': float(dancer.salary),
            'style_id': dancer.style_id,
            'style_name': dancer.style.style_name if dancer.style else None
        })
    return jsonify(result)

def add_dancer():
    data = request.get_json()
    
    # Validate required fields
    if not data or not all(k in data for k in ('name', 'email', 'joining_date', 'salary', 'style_id')):
        return jsonify({'error': 'Missing required fields: name, email, joining_date, salary, style_id'}), 400
    
    try:
        # Get the maximum id and increment by 1
        max_id = session.query(Dancer).order_by(Dancer.id.desc()).first()
        new_id = (max_id.id + 1) if max_id else 1
        
        # Convert joining_date string to date object
        joining_date = datetime.strptime(data['joining_date'], '%Y-%m-%d').date()
        
        # Create new dancer
        new_dancer = Dancer(
            id=new_id,
            name=data['name'],
            email=data['email'],
            joining_date=joining_date,
            salary=data['salary'],
            style_id=data['style_id']
        )
        
        session.add(new_dancer)
        session.commit()
        
        return jsonify({
            'message': 'Dancer added successfully',
            'dancer': {
                'id': new_dancer.id,
                'name': new_dancer.name,
                'email': new_dancer.email,
                'joining_date': str(new_dancer.joining_date),
                'salary': float(new_dancer.salary),
                'style_id': new_dancer.style_id
            }
        }), 201
        
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400

def get_all_dance_styles():
    styles = session.query(DanceStyle).all()
    result = []
    for style in styles:
        result.append({
            'style_id': style.style_id,
            'style_name': style.style_name
        })
    return jsonify(result)

def add_dance_style():
    data = request.get_json()
    
    # Validate required fields
    if not data or 'style_name' not in data:
        return jsonify({'error': 'Missing required field: style_name'}), 400
    
    try:
        # Get the maximum style_id and increment by 1
        max_id = session.query(DanceStyle).order_by(DanceStyle.style_id.desc()).first()
        new_id = (max_id.style_id + 1) if max_id else 1
        
        # Create new dance style
        new_style = DanceStyle(
            style_id=new_id,
            style_name=data['style_name']
        )
        
        session.add(new_style)
        session.commit()
        
        return jsonify({
            'message': 'Dance style added successfully',
            'dance_style': {
                'style_id': new_style.style_id,
                'style_name': new_style.style_name
            }
        }), 201
        
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400

def delete_dancer(identifier):
    try:
        # Try to find by ID if identifier is numeric
        if identifier.isdigit():
            dancer = session.query(Dancer).filter_by(id=int(identifier)).first()
        else:
            # Search by email
            dancer = session.query(Dancer).filter_by(email=identifier).first()
        
        if not dancer:
            return jsonify({'error': 'Dancer not found'}), 404
        
        dancer_info = {
            'id': dancer.id,
            'name': dancer.name,
            'email': dancer.email
        }
        
        session.delete(dancer)
        session.commit()
        
        return jsonify({
            'message': 'Dancer deleted successfully',
            'deleted_dancer': dancer_info
        }), 200
        
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400

def update_dancer(identifier):
    try:
        # Try to find by ID if identifier is numeric
        if identifier.isdigit():
            dancer = session.query(Dancer).filter_by(id=int(identifier)).first()
        else:
            # Search by email
            dancer = session.query(Dancer).filter_by(email=identifier).first()
        
        if not dancer:
            return jsonify({'error': 'Dancer not found'}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Update fields if provided
        if 'name' in data:
            dancer.name = data['name']
        if 'email' in data:
            dancer.email = data['email']
        if 'joining_date' in data:
            dancer.joining_date = datetime.strptime(data['joining_date'], '%Y-%m-%d').date()
        if 'salary' in data:
            dancer.salary = data['salary']
        if 'style_id' in data:
            dancer.style_id = data['style_id']
        
        session.commit()
        
        return jsonify({
            'message': 'Dancer updated successfully',
            'dancer': {
                'id': dancer.id,
                'name': dancer.name,
                'email': dancer.email,
                'joining_date': str(dancer.joining_date),
                'salary': float(dancer.salary),
                'style_id': dancer.style_id,
                'style_name': dancer.style.style_name if dancer.style else None
            }
        }), 200
        
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 400

def register_routes(app):
    @app.route('/api/dancers', methods=['GET', 'POST'])
    def dancers():
        if request.method == 'POST':
            return add_dancer()
        return get_all_dancers()
    
    @app.route('/api/dancers/<search_param>', methods=['GET', 'DELETE', 'PUT'])
    def dancer(search_param):
        if request.method == 'DELETE':
            return delete_dancer(search_param)
        elif request.method == 'PUT':
            return update_dancer(search_param)
        return search_dancer(search_param)
    
    @app.route('/api/dance-styles', methods=['GET', 'POST'])
    def dance_styles():
        if request.method == 'POST':
            return add_dance_style()
        return get_all_dance_styles()
    
    @app.route('/api/dance-styles/<int:style_id>/dancers', methods=['GET'])
    def dancers_by_style(style_id):
        return get_dancers_by_style(style_id)
