from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pg8000.native import Connection
from dotenv import load_dotenv
import traceback
import os
import uuid
import json

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración de Flask para servir archivos desde la raíz (static_folder='')
app = Flask(__name__, static_folder='', static_url_path='')
CORS(app)

# Configuración de carpetas
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- CONFIGURACIÓN DE BASE DE DATOS ---
def get_db_connection():
    """Obtiene conexión usando variables de entorno para portabilidad"""
    return Connection(
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", "admin123"),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        database=os.getenv("DB_NAME", "Capital_Maquinas")
    )

def init_db():
    """Inicializa la base de datos de forma segura"""
    try:
        conn = get_db_connection()
        if os.path.exists('setup.sql'):
            with open('setup.sql', 'r', encoding='utf-8') as f:
                sql_script = f.read()
                # pg8000 requiere ejecutar sentencias una a una
                statements = sql_script.split(';')
                for stmt in statements:
                    if stmt.strip():
                        conn.run(stmt)
            print("INFO: Base de datos sincronizada correctamente.")
        conn.close()
    except Exception as e:
        print(f"ADVERTENCIA: Error al inicializar BD: {e}")

# Inicializar al arrancar
init_db()

# --- ENRUTAMIENTO INTELIGENTE (SPA & STATIC FILES) ---

@app.route('/')
def serve_index():
    """Ruta principal: Entrega el index.html"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_or_spa(path):
    """
    Maneja rutas de archivos reales y rutas de navegación (SPA).
    Si el archivo existe físicamente, lo sirve.
    Si no existe, mapea rutas lógicas a archivos HTML.
    """
    # 1. Si el archivo existe físicamente (ej. shared.js, uploads/foto.jpg)
    full_path = os.path.join(app.static_folder, path)
    if os.path.isfile(full_path):
        return send_from_directory(app.static_folder, path)
    
    # 2. Mapeo de rutas lógicas de navegación
    route_map = {
        'auth/login': 'login.html',
        'admin': 'admin.html',
        'producto': 'producto.html'
    }
    
    # Normalizar path (quitar slash final si existe)
    clean_path = path.rstrip('/')
    if clean_path in route_map:
        return send_from_directory(app.static_folder, route_map[clean_path])
    
    # 3. Fallback: Si nada coincide, devolver index.html (comportamiento SPA estándar)
    return send_from_directory(app.static_folder, 'index.html')

# --- API ENDPOINTS ---

@app.route('/api/upload', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        ext = os.path.splitext(file.filename)[1] or '.jpg'
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # URL DINÁMICA: Detecta automáticamente localhost o dominio real
        base_url = request.host_url.rstrip('/')
        url = f"{base_url}/uploads/{filename}"
        
        return jsonify({'success': True, 'url': url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cms', methods=['GET'])
def get_cms_data():
    try:
        conn = get_db_connection()
        # Productos
        products_raw = conn.run('SELECT id, name, price, category, img, max_speed, motor_type, badge, badge_color, gallery FROM products ORDER BY id ASC')
        products = []
        for row in products_raw:
            gallery_data = []
            if row[9]:
                try: gallery_data = json.loads(row[9])
                except: gallery_data = []
            products.append({
                'id': row[0], 'name': row[1], 'price': row[2], 'category': row[3], 
                'img': row[4], 'maxSpeed': row[5], 'motorType': row[6], 
                'badge': row[7], 'badgeColor': row[8], 'gallery': gallery_data
            })

        # Equipo
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
        cat_id = str(data.get('id', '')).strip()
        label = data.get('label', '').strip()
        icon = data.get('icon', 'category').strip()
        active = bool(data.get('active', True))
        
        conn = get_db_connection()
        res = conn.run('''
            UPDATE categories SET label=:label, icon=:icon, active=:active WHERE id=:id
            RETURNING id
        ''', id=cat_id, label=label, icon=icon, active=active)
        
        if not res:
            conn.run('''
                INSERT INTO categories (id, label, icon, active) VALUES (:id, :label, :icon, :active)
            ''', id=cat_id, label=label, icon=icon, active=active)
            
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
        gallery_json = json.dumps(data.get('gallery', []))
        
        if 'id' in data and data['id']:
            exists = conn.run('SELECT id FROM products WHERE id = :id', id=data['id'])
            if exists:
                conn.run('''
                    UPDATE products SET name=:name, price=:price, category=:category, img=:img, max_speed=:max_speed, motor_type=:motor_type, gallery=:gallery WHERE id=:id
                ''', name=data['name'], price=data['price'], category=data['category'], img=data['img'], 
                     max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'), gallery=gallery_json, id=data['id'])
            else:
                conn.run('''
                    INSERT INTO products (id, name, price, category, img, max_speed, motor_type, gallery) VALUES (:id, :name, :price, :category, :img, :max_speed, :motor_type, :gallery)
                ''', id=data['id'], name=data['name'], price=data['price'], category=data['category'], img=data['img'], 
                     max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'), gallery=gallery_json)
        else:
            conn.run('''
                INSERT INTO products (name, price, category, img, max_speed, motor_type, gallery) VALUES (:name, :price, :category, :img, :max_speed, :motor_type, :gallery)
            ''', name=data['name'], price=data['price'], category=data['category'], img=data['img'], 
                 max_speed=data.get('maxSpeed'), motor_type=data.get('motorType'), gallery=gallery_json)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        conn = get_db_connection()
        conn.run('DELETE FROM products WHERE id = :id', id=product_id)
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/team', methods=['POST'])
def save_team():
    try:
        data = request.json
        conn = get_db_connection()
        if 'id' in data and data['id']:
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
        return jsonify({'error': str(e)}), 500

@app.route('/api/services', methods=['POST'])
def save_service():
    try:
        data = request.json
        conn = get_db_connection()
        if 'id' in data and data['id']:
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
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Usar puerto desde env o 5000 por defecto
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "True") == "True"
    app.run(debug=debug, host='0.0.0.0', port=port)
