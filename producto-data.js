/**
 * Lógica dinámica para la página de detalles del producto
 */

function initProductDetail() {
    console.log("🔍 Iniciando carga de detalles del producto...");
    
    // 1. Obtener ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productIdStr = params.get('id');
    const productId = parseInt(productIdStr);

    if (!productIdStr) {
        console.warn("⚠️ No se encontró ID de producto en la URL.");
        return;
    }

    // 2. Buscar el producto en la base de datos (PRODUCTS de products.js)
    // Usamos comparación no estricta (==) o convertimos ambos a String para evitar problemas de tipos
    const product = PRODUCTS.find(p => String(p.id) === String(productId)) || 
                    PRODUCTS.find(p => String(p.id) === String(productIdStr));

    if (!product) {
        console.warn(`❌ No se encontró el producto con ID ${productId} en el catálogo actual.`, PRODUCTS);
        // Si no se encuentra, no hacemos nada o mostramos un error, pero no fallamos silenciosamente a PRODUCTS[0]
        // porque eso confunde al usuario.
        return;
    }

    console.log("✅ Producto encontrado:", product.name);

    // 3. Actualizar textos e imágenes básicas
    document.title = `${product.name} | Grupo Capital Máquinas`;
    
    const elements = {
        'product-name': product.name,
        'breadcrumb-product-name': product.name,
        'product-price': product.price,
        'product-max-speed': product.maxSpeed,
        'product-motor-type': product.motorType,
        'product-desc': product.description || 'No hay descripción disponible para este equipo.'
    };

    Object.keys(elements).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'product-price') {
                el.innerText = window.formatCurrency(elements[id]);
            } else {
                el.innerText = elements[id];
            }
        }
    });

    // Imagen principal
    const mainImg = document.getElementById("main-product-img");
    if (mainImg && product.img) {
        mainImg.src = product.img;
    }

    // 4. Renderizar Galería Dinámica
    const thumbContainer = document.getElementById("product-gallery-thumbs");
    if (thumbContainer) {
        if (product.gallery && product.gallery.length > 0) {
            thumbContainer.innerHTML = product.gallery.map((imgUrl, idx) => `
                <div class="gallery-thumb aspect-square bg-surface-container rounded-lg overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'} transition-all hover:opacity-90" data-src="${imgUrl}">
                    <img alt="Detalle ${idx + 1}" class="w-full h-full object-cover" src="${imgUrl}"/>
                </div>
            `).join("");

            // Re-inicializar eventos de la galería
            setupGalleryEvents();
        } else {
            // Si no hay galería, ocultamos o vaciamos el contenedor
            thumbContainer.innerHTML = '';
        }
    }
}

function setupGalleryEvents() {
    const mainImg = document.getElementById("main-product-img");
    const thumbs = document.querySelectorAll(".gallery-thumb");
    
    thumbs.forEach(t => {
        t.addEventListener("click", () => {
            const newSrc = t.getAttribute('data-src');
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newSrc;
                mainImg.style.opacity = '1';
            }, 200);
            
            thumbs.forEach(x => x.classList.remove("border-primary", "border-2"));
            thumbs.forEach(x => x.classList.add("border-transparent"));
            t.classList.remove("border-transparent");
            t.classList.add("border-primary", "border-2");
        });
    });
}

// Ejecutar al cargar y cuando los datos del CMS estén listos
document.addEventListener("DOMContentLoaded", initProductDetail);
document.addEventListener("cmsDataReady", () => {
    console.log("🔄 Datos CMS actualizados, refrescando detalles...");
    initProductDetail();
});
