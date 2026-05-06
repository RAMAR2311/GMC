from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pg8000.native import Connection
import traceback
import os
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/uploads/<filename>')
def serve_upload(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/upload', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        # Generate unique filename
        ext = os.path.splitext(file.filename)[1] or '.jpg'
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        # Return the URL to access the file
        url = f"http://localhost:5000/uploads/{filename}"
        return jsonify({'success': True, 'url': url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_db_connection():
    return Connection(
        user="postgres",
        password="admin123",
        host="localhost",
        port=5432,
        database="Capital_Maquinas"
    )

def init_db():
    conn = get_db_connection()
    try:
        with open('setup.sql', 'r', encoding='utf-8') as f:
            sql_script = f.read()
            # pg8000 run no ejecuta multiples sentencias separadas por punto y coma bien en un solo string
            # Dividimos las sentencias
            statements = sql_script.split(';')
            for stmt in statements:
                if stmt.strip():
                    conn.run(stmt)
        print("Base de datos inicializada correctamente.")
    except Exception as e:
        print("Advertencia al inicializar BD (si las tablas ya existen, ignora esto):", e)
    finally:
        conn.close()

# Inicializar base de datos al arrancar
init_db()

@app.route('/api/cms', methods=['GET'])
def get_cms_data():
    try:
        conn = get_db_connection()
        products_raw = conn.run('SELECT id, name, price, category, img, max_speed, motor_type, badge, badge_color FROM products ORDER BY id ASC')
        products = [{'id': row[0], 'name': row[1], 'price': row[2], 'category': row[3], 'img': row[4], 'maxSpeed': row[5], 'motorType': row[6], 'badge': row[7], 'badgeColor': row[8]} for row in products_raw]

        team_raw = conn.run('SELECT id, name, role, "desc", img FROM team_members ORDER BY id ASC')
        team = [{'id': row[0], 'name': row[1], 'role': row[2], 'desc': row[3], 'img': row[4]} for row in team_raw]

        # Servicios
        rows_serv = conn.run('SELECT id, title, "desc", icon FROM services')
        services = [{'id': r[0], 'title': r[1], 'desc': r[2], 'icon': r[3]} for r in rows_serv]

        # Carrusel
        rows_car = conn.run('SELECT id, badge, title, "desc", img, alt FROM carousel_slides')
        carousel = [{'id': r[0], 'badge': r[1], 'title': r[2], 'desc': r[3], 'img': r[4], 'alt': r[5]} for r in rows_car]

        # Categorías
        rows_cat = conn.run('SELECT id, label, icon, active FROM categories')
        categories = [{'id': r[0], 'label': r[1], 'icon': r[2], 'active': r[3]} for r in rows_cat]

        # Textos
        rows_texts = conn.run('SELECT key, value FROM cms_texts')
        texts = {r[0]: r[1] for r in rows_texts}

        conn.close()
        return jsonify({
            'products': products,
            'team': team,
            'services': services,
            'carousel': carousel,
            'categories': categories,
            'texts': texts
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/carousel', methods=['POST'])
def save_carousel_slide():
    try:
        data = request.json
        conn = get_db_connection()
        conn.run('''
            INSERT INTO carousel_slides (id, badge, title, "desc", img, alt)
            VALUES (:id, :badge, :title, :desc, :img, :alt)
            ON CONFLICT (id) DO UPDATE SET
                badge = EXCLUDED.badge,
                title = EXCLUDED.title,
                "desc" = EXCLUDED."desc",
                img = EXCLUDED.img,
                alt = EXCLUDED.alt
        ''', id=data.get('id'), badge=data.get('badge'), title=data.get('title'), 
             desc=data.get('desc'), img=data.get('img'), alt=data.get('alt'))
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categories', methods=['POST'])
def save_category():
    try:
        data = request.json
        conn = get_db_connection()
        conn.run('''
            INSERT INTO categories (id, label, icon, active)
            VALUES (:id, :label, :icon, :active)
            ON CONFLICT (id) DO UPDATE SET
                label = EXCLUDED.label,
                icon = EXCLUDED.icon,
                active = EXCLUDED.active
        ''', id=data.get('id'), label=data.get('label'), icon=data.get('icon'), active=data.get('active'))
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categories/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    try:
        conn = get_db_connection()
        conn.run('DELETE FROM categories WHERE id = :id', id=category_id)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
def save_product():
    try:
        data = request.json
        conn = get_db_connection()
        if 'id' in data and len(str(data['id'])) < 10:
            # Check if exists
            exists = conn.run('SELECT id FROM products WHERE id = :id', id=data['id'])
            if exists:
                conn.run('''
                    UPDATE products SET name=:name, price=:price, category=:category, img=:img, max_speed=:max_speed, motor_type=:motor_type WHERE id=:id
                ''', name=data['name'], price=data['price'], category=data['category'], img=data['img'], max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'), id=data['id'])
            else:
                conn.run('''
                    INSERT INTO products (id, name, price, category, img, max_speed, motor_type) VALUES (:id, :name, :price, :category, :img, :max_speed, :motor_type)
                ''', id=data['id'], name=data['name'], price=data['price'], category=data['category'], img=data['img'], max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'))
        else:
            conn.run('''
                INSERT INTO products (name, price, category, img, max_speed, motor_type) VALUES (:name, :price, :category, :img, :max_speed, :motor_type)
            ''', name=data['name'], price=data['price'], category=data['category'], img=data['img'], max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'))
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        conn = get_db_connection()
        conn.run('DELETE FROM products WHERE id = :id', id=product_id)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/team', methods=['POST'])
def save_team():
    try:
        data = request.json
        conn = get_db_connection()
        if 'id' in data:
            exists = conn.run('SELECT id FROM team_members WHERE id = :id', id=data['id'])
            if exists:
                conn.run('''
                    UPDATE team_members SET name=:name, role=:role, "desc"=:desc, img=:img WHERE id=:id
                ''', name=data['name'], role=data['role'], desc=data['desc'], img=data['img'], id=data['id'])
            else:
                conn.run('''
                    INSERT INTO team_members (id, name, role, "desc", img) VALUES (:id, :name, :role, :desc, :img)
                ''', id=data['id'], name=data['name'], role=data['role'], desc=data['desc'], img=data['img'])
        else:
            conn.run('''
                INSERT INTO team_members (name, role, "desc", img) VALUES (:name, :role, :desc, :img)
            ''', name=data['name'], role=data['role'], desc=data['desc'], img=data['img'])
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/team/<int:member_id>', methods=['DELETE'])
def delete_team(member_id):
    try:
        conn = get_db_connection()
        conn.run('DELETE FROM team_members WHERE id = :id', id=member_id)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/services', methods=['POST'])
def save_service():
    try:
        data = request.json
        conn = get_db_connection()
        if 'id' in data:
            exists = conn.run('SELECT id FROM services WHERE id = :id', id=data['id'])
            if exists:
                conn.run('''
                    UPDATE services SET title=:title, "desc"=:desc, icon=:icon WHERE id=:id
                ''', title=data['title'], desc=data['desc'], icon=data['icon'], id=data['id'])
            else:
                conn.run('''
                    INSERT INTO services (id, title, "desc", icon) VALUES (:id, :title, :desc, :icon)
                ''', id=data['id'], title=data['title'], desc=data['desc'], icon=data['icon'])
        else:
            conn.run('''
                INSERT INTO services (title, "desc", icon) VALUES (:title, :desc, :icon)
            ''', title=data['title'], desc=data['desc'], icon=data['icon'])
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    try:
        conn = get_db_connection()
        conn.run('DELETE FROM services WHERE id = :id', id=service_id)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/texts', methods=['POST'])
def save_texts():
    try:
        texts = request.json
        conn = get_db_connection()
        for key, value in texts.items():
            conn.run('''
                INSERT INTO cms_texts (key, value) VALUES (:key, :value) 
                ON CONFLICT (key) DO UPDATE SET value = :value
            ''', key=key, value=value)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
