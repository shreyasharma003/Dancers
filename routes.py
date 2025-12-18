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


def register_routes(app):
    @app.route('/api/dancers', methods=['GET'])
    def dancers():
        return get_all_dancers()
    
    @app.route('/api/dance-styles/<int:style_id>/dancers', methods=['GET'])
    def dancers_by_style(style_id):
        return get_dancers_by_style(style_id)