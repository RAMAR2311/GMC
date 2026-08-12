/**
 * Datos del catálogo de productos - Grupo Capital Máquinas
 */
const DEFAULT_GALLERY = ["", "", "", ""];

var PRODUCTS = [
  {
    id: 1, name: "Overlock Industrial de Alta Resistencia", price: "$4,850.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser", brand: "JACK",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "5,000 ppm", motorType: "Direct Drive"
  },
  {
    id: 2, name: "Cosedora de Patrones CNC Automatizada", price: "$12,400.00",
    badge: "Novedad", badgeColor: "bg-secondary", category: "Máquinas de Coser", brand: "KANSEW",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "3,200 ppm", motorType: "Servo Motor"
  },
  {
    id: 3, name: "Puntada Recta Electrónica Serie-G", price: "$2,150.00",
    badge: "Oferta", badgeColor: "bg-blue-600", category: "Máquinas de Coser", brand: "JACK",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "4,500 ppm", motorType: "Direct Drive"
  },
  {
    id: 4, name: "Bordadora Multi-cabezal 12 Agujas", price: "$18,900.00",
    badge: "Premium", badgeColor: "bg-tertiary-fixed-dim", category: "Bordadoras Industriales", brand: "JONTEX",
    badgeText: "text-on-tertiary-fixed",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "1,200 ppm", motorType: "Servo de Alta Precisión"
  },
  {
    id: 5, name: "Ojaladora Electrónica de Alta Velocidad", price: "$5,600.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser", brand: "TYPICAL",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "4,200 ppm", motorType: "Direct Drive AC"
  },
  {
    id: 6, name: "Máquina de Poste para Calzado Pro-X", price: "$3,900.00",
    badge: "Especializado", badgeColor: "bg-secondary", category: "Máquinas de Coser", brand: "JAKI",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "2,500 ppm", motorType: "Clutch Motor"
  },
  {
    id: 7, name: "Zig-Zag Industrial de Cama Plana", price: "$2,850.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser", brand: "JACK",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "3,500 ppm", motorType: "Servo Integrado"
  },
  {
    id: 8, name: "Cortadora Vertical de 10\" Precision-Cut", price: "$1,450.00",
    badge: "Últimas Unidades", badgeColor: "bg-error", category: "Cortadoras de Tela", brand: "KANSEW",
    img: "",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "3,400 RPM", motorType: "Inducción Monofásico"
  }
];

var CAROUSEL_SLIDES = [
  { 
    alt: "Maquinaria Industrial CNC", 
    img: "uploads/carousel_1.png",
    badge: "Tecnología de Vanguardia",
    title: "Líderes en Soluciones de Maquinaria Industrial",
    description: "Potenciamos la capacidad productiva de su empresa con equipos de precisión milimétrica y soporte técnico especializado de clase mundial."
  },
  { 
    alt: "Línea de Ensamblaje Industrial", 
    img: "uploads/carousel_2.png",
    badge: "Eficiencia y Rapidez",
    title: "Líneas de Ensamblaje Automatizadas",
    description: "Optimice sus tiempos de producción con nuestras soluciones integrales para el ensamblaje continuo y de alta demanda."
  },
  { 
    alt: "Maquinaria Textil de Alta Gama", 
    img: "uploads/carousel_3.png",
    badge: "Precisión Textil",
    title: "Equipos Premium para la Industria Textil",
    description: "Descubra nuestra gama exclusiva de bordadoras y cosedoras diseñadas para acabados perfectos y durabilidad extrema."
  }
];

var BRANDS = ["JACK", "KANSEW", "JAKI", "JONTEX", "TYPICAL"];

var SIDEBAR_CATEGORIES = []; // Se cargará dinámicamente desde PostgreSQL

// Datos del equipo para la sección Nosotros
var TEAM_MEMBERS = [
  {
    name: "Carlos Rodríguez",
    role: "Director de Ingeniería",
    desc: "Más de 15 años optimizando sistemas mecatrónicos para líneas de producción textil de alto rendimiento.",
    img: ""
  },
  {
    name: "Andrea Gómez",
    role: "Gerente de Cuentas Corporativas",
    desc: "Especialista en estructuración de proyectos de actualización tecnológica para plantas de manufactura.",
    img: ""
  },
  {
    name: "Miguel Torres",
    role: "Líder de Soporte Técnico",
    desc: "Certificado por las principales marcas mundiales para diagnóstico avanzado y reparación de equipos CNC textiles.",
    img: ""
  }
];

// Datos de servicios para la sección Servicios
var SERVICES_DATA = [
  {
    title: "Mantenimiento Preventivo",
    desc: "Programas de revisión periódica para evitar paros inesperados en su línea de producción y extender la vida útil de sus equipos.",
    icon: "build_circle"
  },
  {
    title: "Reparación Correctiva",
    desc: "Diagnóstico avanzado y reparación rápida de fallas técnicas con repuestos 100% originales para minimizar el tiempo de inactividad.",
    icon: "plumbing"
  },
  {
    title: "Instalación y Puesta en Marcha",
    desc: "Aseguramos la correcta instalación, calibración y pruebas de funcionamiento iniciales de toda maquinaria nueva en su planta.",
    icon: "precision_manufacturing"
  },
  {
    title: "Capacitación de Operarios",
    desc: "Entrenamiento técnico certificado para que su personal aprenda a operar eficientemente los nuevos equipos tecnológicos adquiridos.",
    icon: "school"
  }
];


/* ── Render: Product Card (Diseño Exacto de la Imagen) ── */
function renderProductCard(p, idx) {
  const stagger = `stagger-${(idx % 8) + 1}`;
  const displayPrice = window.formatCurrency(p.price || 0);
  const numPrice = typeof p.price === 'number' ? p.price : parseFloat(String(p.price || 0).replace(/[$,]/g, '')) || 0;
  const safeName = (p.name || "Sin Nombre").replace(/"/g, '&quot;');
  const productData = `{ name: &quot;${safeName}&quot;, price: ${numPrice}, img: &quot;${p.img}&quot; }`;
  
  return `
  <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
    <div>
      <a href="producto.html?id=${p.id}" class="block relative aspect-[4/3] bg-white flex items-center justify-center p-2 mb-3">
        <img alt="${p.name}" loading="lazy" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" src="${p.img}"/>
      </a>
      <h3 class="text-xs font-black font-headline text-slate-900 uppercase tracking-tight mb-2 min-h-[2.5rem] line-clamp-2">${p.name}</h3>
      <div class="text-sm font-black text-slate-900 mb-3">${displayPrice}</div>
    </div>
    <div class="flex gap-2">
      <a href="producto.html?id=${p.id}" class="flex-1 bg-[#1A2536] hover:bg-slate-800 text-white font-bold text-[10px] uppercase py-2.5 px-3 rounded-md text-center transition-colors flex items-center justify-center">VER DETALLES</a>
      <button onclick="addToCart(event, ${productData})" class="bg-[#1A2536] hover:bg-slate-800 text-white p-2.5 rounded-md transition-colors flex items-center justify-center shrink-0" aria-label="Añadir al carrito" title="Añadir al carrito">
        <span class="material-symbols-outlined text-base">shopping_cart</span>
      </button>
    </div>
  </article>`;
}

/* ── Render: Product Grid ── */
function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p, i) => renderProductCard(p, i)).join("");
}

/* ── Render: Carousel Slides (Hero Banner Profesional B2B) ── */
function renderCarouselSlides() {
  const container = document.getElementById("carousel-slides");
  if (!container) return;
  container.innerHTML = CAROUSEL_SLIDES.map((s, i) => {
    const isVideo = s.img && (s.img.endsWith('.mp4') || s.img.endsWith('.webm') || s.img.endsWith('.ogg'));
    const mediaHTML = isVideo 
      ? `<video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
          <source src="${s.img}" type="video/${s.img.split('.').pop()}">
         </video>`
      : `<img alt="${s.alt}" class="absolute inset-0 w-full h-full object-cover" src="${s.img}"/>`;

    return `<div class="carousel-slide ${i === 0 ? 'active' : ''} absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000">
      <!-- Vignette Overlay con degradado suave -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent z-10"></div>
      ${mediaHTML}
      <div class="absolute inset-0 z-30 h-full max-w-[1440px] mx-auto px-6 sm:px-12 flex flex-col justify-center items-start pt-20">
        <div class="max-w-xl animate-fade-in-up">
          <!-- Subetiqueta elegante -->
          <span class="inline-flex items-center gap-2 px-3.5 py-1 mb-4 bg-white/10 text-white text-[11px] font-extrabold uppercase tracking-[0.2em] rounded-full backdrop-blur border border-white/20 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> ${s.badge || 'TECNOLOGÍA INDUSTRIAL'}
          </span>
          <h1 class="text-4xl sm:text-6xl font-black font-headline text-white tracking-tight leading-[1.1] mb-4 drop-shadow-lg">
            ${s.title || 'Descubre la Innovación'}
          </h1>
          <p class="text-xs sm:text-sm text-slate-200 font-body leading-relaxed mb-6 max-w-lg drop-shadow">
            ${s.description || 'Equipos automáticos mecatrónicos de alta precisión para confección industrial, bordados y corte textil de última generación.'}
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a href="#product-grid" class="px-8 py-3.5 bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
              <span>Ver Catálogo</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <a href="https://wa.me/573000000000?text=Hola,%20deseo%20asesor%C3%ADa%20para%20maquinaria." target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg backdrop-blur border border-white/30 transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-base text-emerald-400">chat</span>
              <span>Asesoría WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ── Render: Brands (Colores y Estilos Oficiales B2B) ── */
function renderBrands() {
  const el = document.getElementById("brands-list");
  if (!el) return;
  
  const BRAND_STYLES = [
    { key: "BORDADORAS", text: "BORDADORAS", class: "text-[#1e293b] font-extrabold text-[11px] tracking-tight" },
    { key: "brother", text: "brother", class: "text-[#002b66] font-bold text-sm tracking-tight lowercase" },
    { key: "JACK", text: "JaCK", class: "text-[#0096e6] font-black italic text-sm tracking-tighter" },
    { key: "JONTEX", text: "JONTEX", class: "text-[#0b2545] font-black text-sm tracking-tight" },
    { key: "JUKI", text: "JUKI", class: "text-[#0055a5] font-black text-base tracking-wider" },
    { key: "PEGASUS", text: "PEGASUS", class: "text-[#c4262e] font-black text-sm tracking-tight" },
    { key: "SIRUBA", text: "SiRUBA", class: "text-[#d96b27] font-black text-sm tracking-tight" },
    { key: "TYPICAL", text: "TYPICAL", class: "text-[#003366] font-black text-sm tracking-wider" },
    { key: "KANSEW", text: "KANSEW", class: "text-[#004b87] font-black text-sm tracking-widest" }
  ];
  
  el.innerHTML = BRAND_STYLES.map(b =>
    `<a onclick="filterCategory(event, '${b.key}')" class="shrink-0 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer group" href="#product-grid">
      <div class="h-10 px-5 flex items-center justify-center bg-white rounded-xl shadow-xs hover:shadow-md border border-slate-200/90 transition-all">
        <span class="font-headline ${b.class}">${b.text}</span>
      </div>
    </a>`
  ).join("");
}

window.scrollBrands = function(direction) {
  const container = document.getElementById('brands-list');
  if (container) {
    const scrollAmount = 300;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
}

/* ── Render: Sidebar Categories ── */
function renderSidebar() {
  const el = document.getElementById("sidebar-categories");
  if (!el) return;
  const sorted = [...SIDEBAR_CATEGORIES].sort((a, b) => a.label.localeCompare(b.label));
  el.innerHTML = sorted.map(c => {
    if (c.active) {
      return `<a onclick="filterCategory(event, '${c.label}')" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 rounded-lg font-manrope text-sm font-semibold cursor-pointer transition-all duration-200" href="#product-grid">
        <span class="material-symbols-outlined text-lg">${c.icon}</span><span>${c.label}</span></a>`;
    }
    return `<a onclick="filterCategory(event, '${c.label}')" class="flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-900 dark:hover:text-blue-300 rounded-lg font-manrope text-sm font-semibold cursor-pointer transition-all duration-200 hover:translate-x-1" href="#product-grid">
      <span class="material-symbols-outlined text-lg">${c.icon}</span><span>${c.label}</span></a>`;
  }).join("");
}

let FILTERED_PRODUCTS = [];

window.filterCategory = function(e, label) {
  if(e) e.preventDefault();
  
  console.log("Filtrando por:", label);
  
  // Actualizar estado activo en la UI (Sidebar)
  if (typeof SIDEBAR_CATEGORIES !== 'undefined') {
    SIDEBAR_CATEGORIES.forEach(c => {
      c.active = (c.label === label);
    });
    renderSidebar();
  }
  
  const grid = document.getElementById("product-grid");
  const loadBtn = document.getElementById("load-more-btn");
  
  if (grid) {
    grid.style.opacity = '0.3';
    grid.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      // Filtrado real: Buscar por categoría o por marca
      FILTERED_PRODUCTS = PRODUCTS.filter(p => 
        p.category === label || 
        p.brand === label || 
        (label === 'Todos')
      );

      // Si no hay resultados, mostramos todos (opcional, o mostrar mensaje vacío)
      if (FILTERED_PRODUCTS.length === 0 && label !== 'Todos') {
        console.warn("No se encontraron productos para:", label);
        grid.innerHTML = `<div class="col-span-full py-20 text-center">
          <span class="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
          <p class="text-slate-500 font-medium">No encontramos productos en la categoría "${label}"</p>
          <button onclick="filterCategory(null, 'Todos')" class="mt-4 text-brand font-bold underline">Ver todo el inventario</button>
        </div>`;
      } else {
        productsShown = 8;
        const initialBatch = FILTERED_PRODUCTS.slice(0, productsShown);
        grid.innerHTML = initialBatch.map((p, i) => renderProductCard(p, i)).join("");
      }

      grid.style.opacity = '1';
      
      // Gestionar visibilidad del botón "Cargar más"
      if (loadBtn) {
        if (FILTERED_PRODUCTS.length <= productsShown) {
          loadBtn.classList.add('hidden');
        } else {
          loadBtn.classList.remove('hidden');
          loadBtn.innerHTML = "Cargar más inventario";
          loadBtn.disabled = false;
          loadBtn.onclick = loadMoreProducts;
        }
      }
      
      // Hacer scroll suave hacia la grilla
      if (window.scrollY < grid.offsetTop - 100) {
        window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
      }
    }, 400);
  }
}

/* ── Load More Functionality ── */
let productsShown = 8; // Cantidad inicial visible

window.loadMoreProducts = function() {
  const btn = document.getElementById('load-more-btn');
  if (!btn) return;
  
  const sourceArray = (FILTERED_PRODUCTS.length > 0 || document.querySelector('.active')) ? FILTERED_PRODUCTS : PRODUCTS;

  // Si ya mostramos todos, no hacer nada
  if (productsShown >= sourceArray.length) {
    btn.innerHTML = "No hay más resultados";
    btn.classList.add('hidden');
    return;
  }

  // Estado de carga
  btn.innerHTML = '<span class="material-symbols-outlined animate-spin mr-2">refresh</span> Cargando...';
  btn.disabled = true;
  btn.classList.add('opacity-70', 'cursor-not-allowed');

  setTimeout(() => {
    const grid = document.getElementById("product-grid");
    if (grid) {
      const nextBatch = sourceArray.slice(productsShown, productsShown + 8);
      const newHTML = nextBatch.map((p, i) => renderProductCard(p, productsShown + i)).join("");
      grid.insertAdjacentHTML('beforeend', newHTML);
      productsShown += nextBatch.length;
    }
    
    // Restaurar botón
    btn.disabled = false;
    btn.classList.remove('opacity-70', 'cursor-not-allowed');

    if (productsShown >= sourceArray.length) {
      btn.innerHTML = "No hay más resultados";
      btn.classList.add('hidden');
    } else {
      btn.innerHTML = "Cargar más inventario";
    }

  }, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  FILTERED_PRODUCTS = [...PRODUCTS];
  // Render inicial con datos hardcoded o de localStorage
  renderCarouselSlides();
  renderProductGrid();
  renderBrands();
  renderSidebar();
  
  if (typeof initCarousel === 'function') initCarousel();
});

// Escuchar cuando los datos reales de Postgres estén listos para re-renderizar
document.addEventListener("cmsDataReady", () => {
  console.log("📦 Datos de Postgres listos, actualizando interfaz...");
  FILTERED_PRODUCTS = [...PRODUCTS];
  renderCarouselSlides();
  renderProductGrid();
  renderBrands();
  renderSidebar();
  
  if (typeof initCarousel === 'function') initCarousel();
});
