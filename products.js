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

const BRANDS = ["JACK", "KANSEW", "JAKI", "JONTEX", "TYPICAL"];

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


/* ── Render: Product Card ── */
function renderProductCard(p, idx) {
  const stagger = `stagger-${(idx % 8) + 1}`;
  const txtColor = p.badgeText || "text-white";
  const displayPrice = window.formatCurrency(p.price || 0);
  const numPrice = typeof p.price === 'number' ? p.price : parseFloat(String(p.price || 0).replace(/[$,]/g, '')) || 0;
  const safeName = (p.name || "Sin Nombre").replace(/"/g, '&quot;');
  const productData = `{ name: &quot;${safeName}&quot;, price: ${numPrice}, img: &quot;${p.img}&quot; }`;
  
  return `
  <article class="bg-surface-container-lowest overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 opacity-0 animate-fade-in-up ${stagger}">
    <a href="producto.html?id=${p.id}" class="block">
      <div class="aspect-[4/3] bg-white relative overflow-hidden flex items-center justify-center p-4">
        <img alt="${p.name}" loading="lazy" class="max-w-full max-h-full object-contain group-hover:scale-110 transition-all duration-700" src="${p.img}"/>
        <div class="absolute top-4 left-4">
          <span class="${p.badgeColor || 'bg-primary'} ${txtColor} text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">${p.badge || 'Maquinaria'}</span>
        </div>
      </div>
    </a>
    <div class="p-5 sm:p-6">
      <h3 class="text-base font-bold font-manrope text-primary group-hover:text-blue-800 transition-colors mb-2 min-h-[3rem] line-clamp-2">${p.name}</h3>
      <div class="flex flex-col mb-4">
        <span class="text-xs text-slate-500 uppercase font-bold tracking-widest">Precio Unitario</span>
        <span class="text-lg font-manrope font-black text-on-surface">${displayPrice}</span>
      </div>
      <div class="flex gap-2">
        <a href="producto.html?id=${p.id}" class="flex-1 block text-center bg-primary text-white py-3 font-bold text-[10px] uppercase tracking-wider rounded-md hover:bg-primary-container transition-all duration-300 active:scale-95 flex items-center justify-center">Ver Detalles</a>
        <button onclick="addToCart(event, ${productData})" class="px-4 bg-surface-container-high text-primary rounded-md hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300 active:scale-95 flex items-center justify-center" aria-label="Añadir al carrito" title="Añadir al carrito">
          <span class="material-symbols-outlined text-lg">add_shopping_cart</span>
        </button>
      </div>
    </div>
  </article>`;
}

/* ── Render: Product Grid ── */
function renderProductGrid() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p, i) => renderProductCard(p, i)).join("");
}

/* ── Render: Carousel Slides ── */
function renderCarouselSlides() {
  const container = document.getElementById("carousel-slides");
  if (!container) return;
  container.innerHTML = CAROUSEL_SLIDES.map((s, i) =>
    `<div class="carousel-slide ${i === 0 ? 'active' : ''} absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000">
      <div class="absolute inset-0 bg-blue-950/50 z-10"></div>
      <img alt="${s.alt}" class="absolute inset-0 w-full h-full object-cover object-top ${i === 0 ? 'animate-scale-in' : ''}" src="${s.img}"/>
      <!-- Overlay Content para este Slide -->
      <div class="absolute inset-0 z-30 h-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center items-start pointer-events-none">
        <div class="max-w-3xl animate-fade-in-up pointer-events-auto transition-transform">
          <span class="inline-block px-4 py-1.5 mb-4 sm:mb-6 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm">${s.badge}</span>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-manrope text-white tracking-tight leading-[1.1] mb-4 sm:mb-6">${s.title}</h2>
          <p class="text-base sm:text-lg lg:text-xl text-slate-200 font-body leading-relaxed mb-6 sm:mb-10 max-w-2xl">${s.description || s.desc || ''}</p>
        </div>
      </div>
    </div>`
  ).join("");
}

/* ── Render: Brands ── */
function renderBrands() {
  const el = document.getElementById("brands-list");
  if (!el) return;
  el.innerHTML = BRANDS.map(b =>
    `<a onclick="filterCategory(event, '${b}')" class="group transition-all duration-300 hover:scale-105 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 cursor-pointer" href="#product-grid">
      <div class="h-12 w-28 sm:w-32 flex items-center justify-center bg-slate-50 rounded-lg">
        <span class="text-xl font-black font-manrope text-slate-400 group-hover:text-blue-600 transition-colors">${b}</span>
      </div>
    </a>`
  ).join("");
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
