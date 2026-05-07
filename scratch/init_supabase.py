from pg8000.native import Connection
import os
import ssl
from dotenv import load_dotenv

load_dotenv()

def init_supabase_db():
    try:
        print("Intentando conectar a Supabase (con SSL bypass)...")
        
        # Crear contexto SSL que no verifica certificados (necesario para algunos poolers)
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        conn = Connection(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT", 5432)),
            database=os.getenv("DB_NAME"),
            ssl_context=ssl_context
        )
        print("Done: Conexion establecida. Leyendo setup.sql...")
        
        with open('setup.sql', 'r', encoding='utf-8') as f:
            sql = f.read()
            
        # Ejecutar el script SQL
        conn.run(sql)
        
        conn.close()
        print("SUCCESS: Base de datos inicializada correctamente en Supabase.")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    init_supabase_db()
