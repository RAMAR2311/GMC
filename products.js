/**
 * Datos del catálogo de productos - Grupo Capital Máquinas
 */
const DEFAULT_GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCORZTAIM9OYRrnU2bzKTim2WdJED8PvEKQAE3VFawoLP0XkzBxljhjvrwhfbtol6yAxeMWiqhPqfCucReRafKrkp5cMWd_nh1A4MWDwZYKUNM2TMLdCBDPy0v1a3d9Njh3MqagyJbnZLnJrfTVKD0TdFuAZcQhGmzJuYuCzaoARiwwPjfziB30iabLJZi18t79Tddk9rCoXVokH_5FQuosTkHOSvaU2-4CLnUm8s8eG0XEDn3gHHPYwzc4S5nf_A4tqAAfdqNPmvQ3",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5LcODhnowvC75q8IPp8mGjTgexZyHJmnVydx4w4iSasTUF5gVNutNAylk5qqyW_1UTU3YlorpJgp3M9vbsI99DpVJddGlgVDu2IwEkl0YMV6AUqdDqNHyPG3JsyvWZ89VYp5-4L8_pU8evBhv59Lsnpfku5GOHRLFuU6LKZuUO5smYfa2deRcCUweDbGh13gSnCF8nlsch9uX6FX2FG8xBG35xB-HWYbMO3HJCi_TABA_yLOoxgXyBcP2wefor7UnQYjySPwxb4sg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBu9D2MgtKWBEHzTEfr5k8W9H814fidSm1TnVSpbkZw_8C7zJgc1Ocldhx0No5vCMoXyPuyjHjsHzrylfI39iJKvI73ra8B7WhrYl_vThUClfBRVIsgC7LM1D8TCCPkGW6EFfB2cHgck6hl5AKxWjOw_OJx3IGEGhUsHcrqGwT6-UufUIrRhiNQUY2n_sEwZQoS1r92ooiBBEMAnyu0vLLz5yqK9qQwdAbX55B_5PuFC28Hz0FFkqthgCYwTr6_JSkuP00M22qN9_7U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCSgfWot9DB73HE94xgC_HgzGLMwG_r_Rk_7ZL2norfc6BX615xE4MxPfqjYQUEDVvXrot8TXwaJg4gQKukCUGYanWssdEbUxghfAsGsz29BU03eLtWXhKm-7aHzF9KbVWqpQ3TKM1J1L81Kwikfewpg6SxiKetPiLblKRlHBj7Yf22J-DZYJXm85HM5Bd-SA7cX_F0bkllarc8qDV3LyvRN_j_VT2VcDn7gJKoUHCTKDpxa3-AY5P7wjuS6FTWBBqRNQFHVRiIThSq"
];

var PRODUCTS = [
  {
    id: 1, name: "Overlock Industrial de Alta Resistencia", price: "$4,850.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCStmtfszf8CdQv-xu30DL-Ooa0-0zXCZ6xIJvaaQOe1p2XWYH5S7KNn6XKA-_CmIrcYKYI-FF4PUkNVXCkp0Lk6e_Kj0KUH6RJ8aUvCbcGOFpvR3qIdQzcGgneJEpN7BOE5Ww2Jy6EWw2VVDhSmFYed7ulr3r9HV1L9CjISU97835tBBbBzlzlpETMGHpiyIkEAWPFz6mCG55_k8Rr5uLlkxhvUF4tC3DoX6RvLDv5oDPYMwsPc4tTg0GUCizxPt-i_gkK85gNcqBL",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "5,000 ppm", motorType: "Direct Drive"
  },
  {
    id: 2, name: "Cosedora de Patrones CNC Automatizada", price: "$12,400.00",
    badge: "Novedad", badgeColor: "bg-secondary", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEOc8GzYuOY8jQoSxlyWsZPRYBBa1mlXWpgyIlHEf3X6OZHArU5rCuzDHGgkXVy7orCZ4ugQGm9KimSTby0hTq6yiFf7P66SHx_cDKH33xS1wzXxpN5VT0VVKZEJOG1KstdDVTURDKzTXHFW0YRNdl6h1VLtPmssiwEzkiLeF0qRqFfCDjWnkwX676sjixPwLB-mLD-fdTPVv8MzCEMdVlO0JSUrgZFZJRoZNHpfmohzmY3dr1LrADA95a9e0b_OoNGbw91SG1xb6m",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "3,200 ppm", motorType: "Servo Motor"
  },
  {
    id: 3, name: "Puntada Recta Electrónica Serie-G", price: "$2,150.00",
    badge: "Oferta", badgeColor: "bg-blue-600", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj7gWq6h88GhBi4JCGLJwa8KI7wbqCu0Jopw8Vh3GIgKuC1o-QEpyuJsrp5cy_33JerAjos6d8pnIAotkUbCif2OUbIJTiC68LXp4tSya1ZqQHVTaDX0MtKFPre006Xv_y5jQoPJIjBQrOqM6xTP2HwccaM3-6UJNNkXhI1EVFl4ORMTS6OYxiHHomncsgn5a_8JHtNdt_pwR0mLXJ563-InsfKUEsgjGh7kfNV6MrqCXjK61svuIj5Io9QolygCJ_ui35zB1eaOus",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "4,500 ppm", motorType: "Direct Drive"
  },
  {
    id: 4, name: "Bordadora Multi-cabezal 12 Agujas", price: "$18,900.00",
    badge: "Premium", badgeColor: "bg-tertiary-fixed-dim", category: "Bordadoras Industriales",
    badgeText: "text-on-tertiary-fixed",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCStmtfszf8CdQv-xu30DL-Ooa0-0zXCZ6xIJvaaQOe1p2XWYH5S7KNn6XKA-_CmIrcYKYI-FF4PUkNVXCkp0Lk6e_Kj0KUH6RJ8aUvCbcGOFpvR3qIdQzcGgneJEpN7BOE5Ww2Jy6EWw2VVDhSmFYed7ulr3r9HV1L9CjISU97835tBBbBzlzlpETMGHpiyIkEAWPFz6mCG55_k8Rr5uLlkxhvUF4tC3DoX6RvLDv5oDPYMwsPc4tTg0GUCizxPt-i_gkK85gNcqBL",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "1,200 ppm", motorType: "Servo de Alta Precisión"
  },
  {
    id: 5, name: "Ojaladora Electrónica de Alta Velocidad", price: "$5,600.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEOc8GzYuOY8jQoSxlyWsZPRYBBa1mlXWpgyIlHEf3X6OZHArU5rCuzDHGgkXVy7orCZ4ugQGm9KimSTby0hTq6yiFf7P66SHx_cDKH33xS1wzXxpN5VT0VVKZEJOG1KstdDVTURDKzTXHFW0YRNdl6h1VLtPmssiwEzkiLeF0qRqFfCDjWnkwX676sjixPwLB-mLD-fdTPVv8MzCEMdVlO0JSUrgZFZJRoZNHpfmohzmY3dr1LrADA95a9e0b_OoNGbw91SG1xb6m",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "4,200 ppm", motorType: "Direct Drive AC"
  },
  {
    id: 6, name: "Máquina de Poste para Calzado Pro-X", price: "$3,900.00",
    badge: "Especializado", badgeColor: "bg-secondary", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj7gWq6h88GhBi4JCGLJwa8KI7wbqCu0Jopw8Vh3GIgKuC1o-QEpyuJsrp5cy_33JerAjos6d8pnIAotkUbCif2OUbIJTiC68LXp4tSya1ZqQHVTaDX0MtKFPre006Xv_y5jQoPJIjBQrOqM6xTP2HwccaM3-6UJNNkXhI1EVFl4ORMTS6OYxiHHomncsgn5a_8JHtNdt_pwR0mLXJ563-InsfKUEsgjGh7kfNV6MrqCXjK61svuIj5Io9QolygCJ_ui35zB1eaOus",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "2,500 ppm", motorType: "Clutch Motor"
  },
  {
    id: 7, name: "Zig-Zag Industrial de Cama Plana", price: "$2,850.00",
    badge: "En Stock", badgeColor: "bg-primary", category: "Máquinas de Coser",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCStmtfszf8CdQv-xu30DL-Ooa0-0zXCZ6xIJvaaQOe1p2XWYH5S7KNn6XKA-_CmIrcYKYI-FF4PUkNVXCkp0Lk6e_Kj0KUH6RJ8aUvCbcGOFpvR3qIdQzcGgneJEpN7BOE5Ww2Jy6EWw2VVDhSmFYed7ulr3r9HV1L9CjISU97835tBBbBzlzlpETMGHpiyIkEAWPFz6mCG55_k8Rr5uLlkxhvUF4tC3DoX6RvLDv5oDPYMwsPc4tTg0GUCizxPt-i_gkK85gNcqBL",
    gallery: [...DEFAULT_GALLERY],
    maxSpeed: "3,500 ppm", motorType: "Servo Integrado"
  },
  {
    id: 8, name: "Cortadora Vertical de 10\" Precision-Cut", price: "$1,450.00",
    badge: "Últimas Unidades", badgeColor: "bg-error", category: "Cortadoras de Tela",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEOc8GzYuOY8jQoSxlyWsZPRYBBa1mlXWpgyIlHEf3X6OZHArU5rCuzDHGgkXVy7orCZ4ugQGm9KimSTby0hTq6yiFf7P66SHx_cDKH33xS1wzXxpN5VT0VVKZEJOG1KstdDVTURDKzTXHFW0YRNdl6h1VLtPmssiwEzkiLeF0qRqFfCDjWnkwX676sjixPwLB-mLD-fdTPVv8MzCEMdVlO0JSUrgZFZJRoZNHpfmohzmY3dr1LrADA95a9e0b_OoNGbw91SG1xb6m",
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
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Andrea Gómez",
    role: "Gerente de Cuentas Corporativas",
    desc: "Especialista en estructuración de proyectos de actualización tecnológica para plantas de manufactura.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Miguel Torres",
    role: "Líder de Soporte Técnico",
    desc: "Certificado por las principales marcas mundiales para diagnóstico avanzado y reparación de equipos CNC textiles.",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
  const rawPrice = p.price || "0";
  const numPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[$,]/g, '')) || 0;
  const displayPrice = typeof rawPrice === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rawPrice) : rawPrice;
  const safeName = (p.name || "Sin Nombre").replace(/"/g, '&quot;');
  const productData = `{ name: &quot;${safeName}&quot;, price: ${numPrice}, img: &quot;${p.img}&quot; }`;
  
  return `
  <article class="bg-surface-container-lowest overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 opacity-0 animate-fade-in-up ${stagger}">
    <a href="producto.html?id=${p.id}" class="block">
      <div class="aspect-[4/3] bg-surface relative overflow-hidden">
        <img alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" src="${p.img}"/>
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
      <img alt="${s.alt}" class="absolute inset-0 w-full h-full object-cover ${i === 0 ? 'animate-scale-in' : ''}" src="${s.img}"/>
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
  el.innerHTML = SIDEBAR_CATEGORIES.map(c => {
    if (c.active) {
      return `<a onclick="filterCategory(event, '${c.label}')" class="flex items-center space-x-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 rounded-lg font-manrope text-sm font-semibold cursor-pointer transition-all duration-200" href="#product-grid">
        <span class="material-symbols-outlined text-lg">${c.icon}</span><span>${c.label}</span></a>`;
    }
    return `<a onclick="filterCategory(event, '${c.label}')" class="flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-900 dark:hover:text-blue-300 rounded-lg font-manrope text-sm font-semibold cursor-pointer transition-all duration-200 hover:translate-x-1" href="#product-grid">
      <span class="material-symbols-outlined text-lg">${c.icon}</span><span>${c.label}</span></a>`;
  }).join("");
}

/* ── Category Filter Functionality ── */
window.filterCategory = function(e, label) {
  e.preventDefault();
  
  // Actualizar estado activo en la UI
  SIDEBAR_CATEGORIES.forEach(c => {
    c.active = (c.label === label);
  });
  renderSidebar();
  
  // Simular filtrado en la grilla
  const grid = document.getElementById("product-grid");
  const loadBtn = document.getElementById("load-more-btn");
  
  if (grid) {
    grid.style.opacity = '0.3';
    grid.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      // Simular que mostramos diferentes productos al filtrar (mezclando el array original)
      const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 4 + Math.floor(Math.random() * 4));
      grid.innerHTML = shuffled.map((p, i) => renderProductCard(p, i)).join("");
      grid.style.opacity = '1';
      
      // Restaurar el botón de cargar más si existe
      if (loadBtn) {
        loadBtn.innerHTML = "Cargar más inventario";
        loadBtn.classList.remove('text-on-surface-variant', 'bg-surface-container-low', 'cursor-default', 'opacity-70', 'cursor-not-allowed');
        loadBtn.classList.add('hover:bg-surface-container-highest', 'active:scale-95', 'text-primary');
        loadBtn.disabled = false;
        loadBtn.onclick = loadMoreProducts;
      }
      
      // Hacer scroll suave hacia la grilla si estábamos más arriba
      if (window.scrollY < grid.offsetTop - 100) {
        window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
      }
    }, 600);
  }
}

/* ── Load More Functionality ── */
let productsShown = 8; // Cantidad inicial visible

window.loadMoreProducts = function() {
  const btn = document.getElementById('load-more-btn');
  if (!btn) return;
  
  // Si ya mostramos todos, no hacer nada
  if (productsShown >= PRODUCTS.length) {
    btn.innerHTML = "No hay más resultados";
    btn.classList.remove('hover:bg-surface-container-highest', 'active:scale-95', 'text-primary');
    btn.classList.add('text-on-surface-variant', 'bg-surface-container-low', 'cursor-default');
    btn.onclick = null;
    return;
  }

  // Estado de carga
  btn.innerHTML = '<span class="material-symbols-outlined animate-spin mr-2">refresh</span> Cargando...';
  btn.disabled = true;
  btn.classList.add('opacity-70', 'cursor-not-allowed');

  setTimeout(() => {
    const grid = document.getElementById("product-grid");
    if (grid) {
      const nextBatch = PRODUCTS.slice(productsShown, productsShown + 8);
      const newHTML = nextBatch.map((p, i) => renderProductCard(p, productsShown + i)).join("");
      grid.insertAdjacentHTML('beforeend', newHTML);
      productsShown += nextBatch.length;
    }
    
    // Restaurar botón
    btn.disabled = false;
    btn.classList.remove('opacity-70', 'cursor-not-allowed');

    if (productsShown >= PRODUCTS.length) {
      btn.innerHTML = "No hay más resultados";
      btn.classList.remove('hover:bg-surface-container-highest', 'active:scale-95', 'text-primary');
      btn.classList.add('text-on-surface-variant', 'bg-surface-container-low', 'cursor-default');
      btn.onclick = null;
    } else {
      btn.innerHTML = "Cargar más inventario";
    }

  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
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
  renderCarouselSlides();
  renderProductGrid();
  renderBrands();
  renderSidebar();
  
  if (typeof initCarousel === 'function') initCarousel();
});
