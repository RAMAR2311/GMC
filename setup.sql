-- Script de creación de tablas para PostgreSQL
-- Ejecuta esto en tu herramienta de base de datos (pgAdmin, DBeaver, etc.)

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(50),
    category VARCHAR(100),
    img TEXT,
    max_speed VARCHAR(50),
    motor_type VARCHAR(100),
    badge VARCHAR(50) DEFAULT 'Nuevo',
    badge_color VARCHAR(50) DEFAULT 'bg-secondary'
);

-- 2. Tabla de Equipo (Nosotros)
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    "desc" TEXT,
    img TEXT
);

-- 3. Tabla de Servicios
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    "desc" TEXT,
    icon VARCHAR(100)
);

-- 4. Tabla de Textos Generales (CMS)
CREATE TABLE IF NOT EXISTS cms_texts (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT
);

-- Insertar algunos datos iniciales de prueba (opcional)
INSERT INTO cms_texts (key, value) VALUES 
('nosotros-hero-title', 'Sobre Nosotros'),
('nosotros-hero-desc', 'Líderes en maquinaria textil.'),
('servicios-hero-title', 'Nuestros Servicios')
ON CONFLICT (key) DO NOTHING;
