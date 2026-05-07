from pg8000.native import Connection
import os
from dotenv import load_dotenv

load_dotenv()

def add_services():
    try:
        conn = Connection(
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASS", "admin123"),
            host=os.getenv("DB_HOST", "localhost"),
            port=int(os.getenv("DB_PORT", 5432)),
            database=os.getenv("DB_NAME", "Capital_Maquinas")
        )
        
        services = [
            ("Capacitación Técnica", "Formación especializada para sus operarios en el manejo y mantenimiento preventivo de maquinaria de última generación.", "school"),
            ("Suministro de Repuestos", "Contamos con un inventario permanente de repuestos originales con entrega inmediata para evitar paradas de producción.", "settings_input_component"),
            ("Auditoría de Planta", "Analizamos sus procesos actuales para identificar cuellos de botella y proponer mejoras tecnológicas que aumenten su rentabilidad.", "analytics")
        ]
        
        for title, desc, icon in services:
            conn.run('INSERT INTO services (title, "desc", icon) VALUES (:title, :desc, :icon)', 
                     title=title, desc=desc, icon=icon)
            
        conn.close()
        print("Done: 3 new services added correctly.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    add_services()
