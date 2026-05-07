"""
Script para insertar servicios de ejemplo en Supabase
para Grupo Capital de Maquinaria
"""
from pg8000.native import Connection
import os
import ssl
from dotenv import load_dotenv

load_dotenv()

SERVICES = [
    {
        "title": "Mantenimiento Preventivo",
        "desc": "Programas de revisión periódica para evitar paros inesperados en su línea de producción. Incluye lubricación, calibración, ajuste de tensiones y revisión de componentes eléctricos para extender la vida útil de sus equipos.",
        "icon": "build_circle"
    },
    {
        "title": "Reparación Correctiva",
        "desc": "Diagnóstico avanzado y reparación rápida de fallas técnicas con repuestos 100% originales. Nuestros técnicos certificados minimizan el tiempo de inactividad de su maquinaria industrial.",
        "icon": "plumbing"
    },
    {
        "title": "Instalación y Puesta en Marcha",
        "desc": "Aseguramos la correcta instalación, calibración y pruebas de funcionamiento iniciales de toda maquinaria nueva en su planta. Incluye capacitación básica del operario asignado.",
        "icon": "precision_manufacturing"
    },
    {
        "title": "Capacitación de Operarios",
        "desc": "Entrenamiento técnico certificado para que su personal aprenda a operar eficientemente los nuevos equipos. Programas teórico-prácticos adaptados a las necesidades de su empresa.",
        "icon": "school"
    },
    {
        "title": "Venta de Repuestos Originales",
        "desc": "Suministro de repuestos originales y homologados para todas las marcas que manejamos: JACK, KANSEW, JAKI, JONTEX y TYPICAL. Envíos a nivel nacional con garantía de fábrica.",
        "icon": "inventory_2"
    },
    {
        "title": "Asesoría Técnica Especializada",
        "desc": "Consultoría profesional para optimizar su línea de producción. Evaluamos su flujo de trabajo y recomendamos las soluciones de maquinaria más eficientes para maximizar su rentabilidad.",
        "icon": "engineering"
    },
    {
        "title": "Servicio de Emergencia 24/7",
        "desc": "Atención prioritaria para fallas críticas que detienen su producción. Nuestro equipo de respuesta rápida está disponible las 24 horas para garantizar la continuidad de sus operaciones.",
        "icon": "emergency"
    },
    {
        "title": "Automatización de Procesos",
        "desc": "Modernización de su planta con soluciones de automatización industrial. Implementamos sistemas de control, sensores y software para aumentar la productividad y reducir costos operativos.",
        "icon": "smart_toy"
    }
]

def seed_services():
    try:
        print("Conectando a Supabase...")
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
        print("Conexión establecida.")

        # Limpiar servicios existentes
        conn.run("DELETE FROM services")
        print("Servicios anteriores eliminados.")

        # Insertar nuevos servicios
        for s in SERVICES:
            conn.run(
                'INSERT INTO services (title, "desc", icon) VALUES (:t, :d, :i)',
                t=s["title"], d=s["desc"], i=s["icon"]
            )
            print(f"  [OK] {s['title']}")

        conn.close()
        print(f"\n{len(SERVICES)} servicios insertados correctamente.")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    seed_services()
