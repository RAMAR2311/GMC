from pg8000.native import Connection
import os
from dotenv import load_dotenv

load_dotenv()

def migrate_brands():
    conn = Connection(
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", "admin123"),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        database=os.getenv("DB_NAME", "Capital_Maquinas")
    )
    try:
        # 1. Crear tabla de marcas
        conn.run("""
            CREATE TABLE IF NOT EXISTS brands (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE NOT NULL
            );
        """)
        
        # 2. Insertar marcas iniciales si no existen
        initial_brands = ["JACK", "KANSEW", "JAKI", "JONTEX", "TYPICAL"]
        for b in initial_brands:
            conn.run("INSERT INTO brands (name) VALUES (:name) ON CONFLICT (name) DO NOTHING;", name=b)
        
        # 3. Añadir columna brand a productos
        conn.run("ALTER TABLE products ADD COLUMN IF NOT EXISTS brand VARCHAR(100);")
        
        print("SUCCESS: Database migration for brands completed.")
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_brands()
