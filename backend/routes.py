from flask import jsonify, request
from models import session, Dancer, DanceStyle
from datetime import datetime
from auth import token_required

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
    """Search dancer by id, name, email, or salary"""
    dancers = []
    
    # Try searching by ID if numeric
    if search_param.isdigit():
        dancer = session.query(Dancer).filter_by(id=int(search_param)).first()
        if dancer:
            dancers = [dancer]
    
    # If no result or not numeric, try other fields
    if not dancers:
        # Search by name (case-insensitive, partial match)
        dancers = session.query(Dancer).filter(Dancer.name.ilike(f'%{search_param}%')).all()
    
    if not dancers:
        # Search by email (case-insensitive, partial match)
        dancers = session.query(Dancer).filter(Dancer.email.ilike(f'%{search_param}%')).all()
    
    if not dancers:
        # Search by salary if numeric
        try:
            salary_value = float(search_param)
            dancers = session.query(Dancer).filter_by(salary=salary_value).all()
        except ValueError:
            pass
    
    if not dancers:
        return jsonify({'error': 'Dancer not found'}), 404
    
    # If single result, return object; if multiple, return array
    if len(dancers) == 1:
        dancer = dancers[0]
        return jsonify({
            'id': dancer.id,
            'name': dancer.name,
            'email': dancer.email,
            'joining_date': str(dancer.joining_date),
            'salary': float(dancer.salary),
            'style_id': dancer.style_id,
            'style_name': dancer.style.style_name if dancer.style else None
        })
    else:
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
    
    if not data or not all(k in data for k in ('name', 'email', 'joining_date', 'salary', 'style_id')):
        return jsonify({'error': 'Missing required fields: name, email, joining_date, salary, style_id'}), 400
    
    try:
        
        max_id = session.query(Dancer).order_by(Dancer.id.desc()).first()
        new_id = (max_id.id + 1) if max_id else 1
        
        joining_date = datetime.strptime(data['joining_date'], '%Y-%m-%d').date()
        
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

    if not data or 'style_name' not in data:
        return jsonify({'error': 'Missing required field: style_name'}), 400
    
    try:
   
        max_id = session.query(DanceStyle).order_by(DanceStyle.style_id.desc()).first()
        new_id = (max_id.style_id + 1) if max_id else 1
        
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
      
        if identifier.isdigit():
            dancer = session.query(Dancer).filter_by(id=int(identifier)).first()
        else:
          
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
        
        if identifier.isdigit():
            dancer = session.query(Dancer).filter_by(id=int(identifier)).first()
        else:
 
            dancer = session.query(Dancer).filter_by(email=identifier).first()
        
        if not dancer:
            return jsonify({'error': 'Dancer not found'}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
   
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
    @token_required
    def dancers(current_user):
        if request.method == 'POST':
            return add_dancer()
        return get_all_dancers()
    
    @app.route('/api/dancers/<search_param>', methods=['GET', 'DELETE', 'PUT'])
    @token_required
    def dancer(current_user, search_param):
        if request.method == 'DELETE':
            return delete_dancer(search_param)
        elif request.method == 'PUT':
            return update_dancer(search_param)
        return search_dancer(search_param)
    
    @app.route('/api/dance-styles', methods=['GET', 'POST'])
    @token_required
    def dance_styles(current_user):
        if request.method == 'POST':
            return add_dance_style()
        return get_all_dance_styles()
    
    @app.route('/api/dance-styles/<int:style_id>/dancers', methods=['GET'])
    @token_required
    def dancers_by_style(current_user, style_id):
        return get_dancers_by_style(style_id)
