/**
 * DB SERVICE - Grupo Capital Máquinas (PostgreSQL Edition vía Python)
 * Gestiona la conexión con el servidor Flask local
 */

const API_URL = "/api";

const DB = {
    // Cargar todos los datos desde Postgres
    async getAllData() {
        try {
            const response = await fetch(`${API_URL}/cms`);
            if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener datos.`);
            return await response.json();
        } catch (e) {
            console.warn("⚠️ Servidor local no detectado. Usando LocalStorage como respaldo.", e);
            return {
                products: JSON.parse(localStorage.getItem('maquitec_products')) || [],
                team: JSON.parse(localStorage.getItem('maquitec_team')) || [],
                services: JSON.parse(localStorage.getItem('maquitec_services')) || [],
                categories: JSON.parse(localStorage.getItem('maquitec_categories')) || [],
                texts: JSON.parse(localStorage.getItem('maquitec_cms_texts')) || {}
            };
        }
    },

    // Guardar Producto
    async saveProduct(product) {
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Error desconocido al guardar producto.");
            }
            return true;
        } catch (e) {
            console.error("Error guardando en Postgres:", e);
            alert("❌ No se pudo guardar en la base de datos: " + e.message);
            throw e;
        }
    },

    // Eliminar Producto
    async deleteProduct(id) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("No se pudo eliminar el producto.");
        } catch (e) {
            alert("❌ Error al eliminar: " + e.message);
        }
    },

    // Eliminar Miembro Equipo
    async deleteTeamMember(id) {
        try {
            const response = await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("No se pudo eliminar el miembro del equipo.");
        } catch (e) { alert("❌ Error al eliminar equipo: " + e.message); }
    },

    // Guardar Miembro de Equipo
    async saveTeamMember(member) {
        try {
            const response = await fetch(`${API_URL}/team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
            });
            if (!response.ok) throw new Error("Error al guardar miembro del equipo.");
        } catch (e) {
            alert("❌ Error: " + e.message);
        }
    },

    // Eliminar Servicio
    async deleteService(id) {
        try {
            const response = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("No se pudo eliminar el servicio.");
        } catch (e) { alert("❌ Error al eliminar servicio: " + e.message); }
    },

    // Guardar Servicio
    async saveService(service) {
        try {
            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service)
            });
            if (!response.ok) throw new Error("Error al guardar servicio.");
        } catch (e) {
            alert("❌ Error: " + e.message);
        }
    },

    // Guardar Slide del Carrusel
    async saveCarouselSlide(slide) {
        try {
            const response = await fetch(`${API_URL}/carousel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slide)
            });
            if (!response.ok) throw new Error("Error al guardar slide.");
        } catch (e) { alert("❌ Error: " + e.message); }
    },

    // Guardar Categoría
    async saveCategory(cat) {
        try {
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cat)
            });
            if (!response.ok) throw new Error("Error al guardar categoría.");
        } catch (e) { alert("Error: " + e.message); }
    },

    // Eliminar Categoría
    async deleteCategory(id) {
        try {
            const response = await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("No se pudo eliminar la categoria.");
        } catch (e) { alert("Error al eliminar categoria: " + e.message); }
    },

    // Guardar textos CMS
    async saveTexts(textsObject) {
        try {
            const response = await fetch(`${API_URL}/texts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(textsObject)
            });
            if (!response.ok) throw new Error("Error al guardar textos.");
        } catch (e) {
            console.error("Error guardando textos:", e);
            // Fallback a local para textos (útil para cambios rápidos)
            const existing = JSON.parse(localStorage.getItem('maquitec_cms_texts') || '{}');
            const updated = { ...existing, ...textsObject };
            localStorage.setItem('maquitec_cms_texts', JSON.stringify(updated));
            alert("⚠️ Se guardó localmente porque el servidor no respondió.");
        }
    },
    // Guardar Marca
    async saveBrand(brand) {
        try {
            const response = await fetch(`${API_URL}/brands`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brand)
            });
            if (!response.ok) throw new Error("Error al guardar marca.");
        } catch (e) { alert("❌ Error: " + e.message); }
    },
    // Eliminar Marca
    async deleteBrand(id) {
        try {
            const response = await fetch(`${API_URL}/brands/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("No se pudo eliminar la marca.");
        } catch (e) { alert("❌ Error al eliminar marca: " + e.message); }
    }
};

window.CMS_DB = DB;
