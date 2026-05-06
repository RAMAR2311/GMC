from pg8000.native import Connection
import os
from dotenv import load_dotenv

load_dotenv()

def fix_encoding():
    c = Connection(
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", "admin123"),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        database=os.getenv("DB_NAME", "Capital_Maquinas")
    )
    
    # Lista de categorías con nombres correctos (UTF-8)
    cats = [
        ('rectas', 'Máquinas de Coser', 'styler', True),
        ('tela', 'Cortadoras de Tela', 'content_cut', True),
        ('bordadoras', 'Bordadoras Industriales', 'auto_fix_high', True),
        ('planchado', 'Equipos de Planchado', 'iron', True),
        ('repuestos', 'Repuestos y Agujas', 'build', True),
        ('logistica', 'Logística Textil', 'local_shipping', True)
    ]
    
    for cid, label, icon, active in cats:
        c.run('''
            UPDATE categories SET label=:label, icon=:icon, active=:active WHERE id=:id
        ''', id=cid, label=label, icon=icon, active=active)
        
    c.close()
    print("Codificación corregida en PostgreSQL.")

if __name__ == "__main__":
    fix_encoding()
