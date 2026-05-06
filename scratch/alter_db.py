from pg8000.native import Connection
import os
from dotenv import load_dotenv

load_dotenv()

def alter_db():
    conn = Connection(
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", "admin123"),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", 5432)),
        database=os.getenv("DB_NAME", "Capital_Maquinas")
    )
    try:
        conn.run("ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;")
        print("SUCCESS: Column 'description' added to 'products' table.")
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    alter_db()
