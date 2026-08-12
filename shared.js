/**
 * ============================================================
 * GRUPO CAPITAL DE MAQUINARIA - Componentes Compartidos
 * Archivo: shared.js
 * Descripción: TopNavBar, Footer y utilidades comunes
 * ============================================================
 */

/* ── Tailwind Config (inyectado dinámicamente) ── */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary, #1A365D)",
        "secondary": "var(--color-secondary, #4A5568)",
        "background": "var(--color-background, #FFFFFF)",
        "surface": "var(--color-surface, #E2E8F0)",
        "on-surface": "var(--color-text, #2D3748)",
        "on-primary": "var(--color-on-primary, #FFFFFF)",
        "on-secondary": "#FFFFFF",
        "surface-container-lowest": "var(--color-card, #FFFFFF)",
        "surface-container": "var(--color-surface-container, #F8FAFC)",
        "outline": "#CBD5E1",
        "primary-container": "#C3DAFE",
        "on-primary-container": "var(--color-primary, #1A365D)",
        "secondary-container": "#E2E8F0",
        "on-secondary-container": "var(--color-text, #2D3748)",
        "brand": "var(--color-brand, #1A365D)",
        "accent": "var(--color-accent, #4A5568)",
        "bgLight": "var(--color-background, #FFFFFF)",
        "coal": "var(--color-text, #2D3748)",
        "error": "#ba1a1a",
        "outline-variant": "#c5c6d2",
        "primary-fixed-dim": "#b3c5ff",
        "tertiary-fixed-dim": "#b8c8da"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
        label: ["Inter"],
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 1.2s ease-out forwards"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        scaleIn: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" }
        }
      }
    }
  }
};

/* ── Inyectar TopNavBar ── */
function renderNavbar(activePage) {
  const navLinks = [
    { label: "Marketplace", href: "index.html", id: "inventario" },
    { label: "Nosotros", href: "nosotros.html", id: "nosotros" },
    { label: "Servicios", href: "servicios.html", id: "servicios" },
    { label: "Soporte", href: "soporte.html", id: "soporte" }
  ];

  const linksHTML = navLinks.map(link => {
    const isActive = link.id === activePage;
    const classes = isActive
      ? "font-headline text-sm font-black text-white border-b-2 border-white pb-1 tracking-wide transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      : "font-headline text-sm font-bold text-slate-100 hover:text-white transition-all tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:scale-105 inline-block";
    return `<a class="${classes}" href="${link.href}">${link.label}</a>`;
  }).join("");

  const mobileLinksHTML = navLinks.map(link => {
    const isActive = link.id === activePage;
    const classes = isActive
      ? "block px-4 py-3 font-headline font-bold text-white bg-blue-600 rounded-lg text-sm"
      : "block px-4 py-3 font-headline font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm";
    return `<a class="${classes}" href="${link.href}" onclick="closeMobileMenu()">${link.label}</a>`;
  }).join("");

  const navbar = document.getElementById("navbar-placeholder");
  if (!navbar) return;

  navbar.innerHTML = `
    <nav id="main-nav" class="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent border-b border-white/10 transition-all duration-300" role="navigation" aria-label="Navegación principal">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-3 shrink-0 group" aria-label="Ir al inicio">
          <img src="logo.png" alt="Grupo Capital Máquinas" class="h-9 w-auto object-contain max-h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          <span class="text-lg sm:text-xl font-black tracking-tight text-white font-headline drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Grupo Capital Máquinas</span>
        </a>

        <!-- Desktop Nav Links (Centro) -->
        <div class="hidden md:flex items-center space-x-10 shrink-0">${linksHTML}</div>

        <!-- Actions (Derecha) -->
        <div class="flex items-center space-x-5 shrink-0">
          
          <!-- Carrito de Compras -->
          <div class="relative">
            <button id="cart-toggle-btn" onclick="toggleCart()" class="text-white hover:text-blue-300 transition-all relative p-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" aria-label="Carrito de compras" title="Ver carrito">
              <span class="material-symbols-outlined text-2xl">shopping_cart</span>
              <span id="cart-badge" class="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
            </button>
            
            <!-- Dropdown del Carrito -->
            <div id="cart-dropdown" class="absolute right-0 mt-3 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-slate-700/80 hidden opacity-0 transition-opacity duration-200 z-50">
              <div class="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 class="font-bold text-white font-headline text-sm flex items-center gap-2"><span class="material-symbols-outlined text-blue-400">shopping_bag</span> Mi Carrito</h3>
                <span id="cart-total-items" class="text-xs text-slate-300 font-bold bg-slate-800 px-2 py-1 rounded-md">0 items</span>
              </div>
              <div id="cart-items-container" class="max-h-64 overflow-y-auto p-2">
                <div class="p-4 text-center text-sm text-slate-400">El carrito está vacío.</div>
              </div>
              <div class="p-4 border-t border-slate-800 bg-slate-950/60 rounded-b-2xl">
                <div class="flex justify-between mb-4">
                  <span class="text-xs font-bold text-slate-400">Total Estimado:</span>
                  <span id="cart-total-price" class="text-base font-black text-white">$0.00 COP</span>
                </div>
                <a href="https://wa.me/573000000000?text=Hola,%20deseo%20finalizar%20la%20compra%20de%20mis%20productos." target="_blank" rel="noopener noreferrer" class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                  <span class="material-symbols-outlined text-base">chat</span> Solicitar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative">
            <button id="user-toggle-btn" onclick="toggleUserMenu()" class="text-white hover:text-blue-300 transition-all p-2 flex items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" aria-label="Mi Cuenta" title="Mi Cuenta">
              <span class="material-symbols-outlined text-2xl">person</span>
            </button>
            <div id="user-dropdown" class="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-slate-700/80 hidden opacity-0 transition-opacity duration-200 z-50">
              <div class="py-2">
                <div class="px-4 py-3 border-b border-slate-800 mb-1">
                  <p class="text-sm font-bold text-white">Mi Cuenta</p>
                  <p class="text-xs text-slate-400">Acceso Administrador</p>
                </div>
                <a href="admin.html" class="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 transition-colors font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-lg text-blue-400">admin_panel_settings</span>Panel Editor Admin</a>
                <a href="login.html" class="block px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/30 transition-colors font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-lg">logout</span>Iniciar Sesión</a>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button id="mobile-menu-btn" class="md:hidden text-white p-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" aria-label="Abrir menú" onclick="toggleMobileMenu()">
            <span class="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 py-4 space-y-2 shadow-xl">
        ${mobileLinksHTML}
      </div>
    </nav>`;

  // Scroll Listener para oscurecer dinámicamente al bajar
  window.removeEventListener('scroll', window._onNavScroll);
  window._onNavScroll = function() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'shadow-xl');
      nav.classList.remove('bg-gradient-to-b', 'from-slate-950/80', 'via-slate-950/40', 'to-transparent');
    } else {
      nav.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'shadow-xl');
      nav.classList.add('bg-gradient-to-b', 'from-slate-950/80', 'via-slate-950/40', 'to-transparent');
    }
  };
  window.addEventListener('scroll', window._onNavScroll);
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}
function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.add("hidden");
}

/* ── Inyectar Footer Idéntico a la Imagen ── */
function renderFooter() {
  const footer = document.getElementById("footer-placeholder");
  if (!footer) return;

  const companyName = (window.CMS_TEXTS && window.CMS_TEXTS['footer-company-name']) 
    ? window.CMS_TEXTS['footer-company-name'] 
    : 'Grupo Capital Máquinas';

  const copyrightText = (window.CMS_TEXTS && window.CMS_TEXTS['footer-copyright']) 
    ? window.CMS_TEXTS['footer-copyright'] 
    : 'Copyright 2026 Grupo Capital Máquinas';

  footer.innerHTML = `
    <footer class="w-full bg-[#181E29] text-slate-300 py-8 px-6 sm:px-12 border-t border-slate-800" role="contentinfo">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
        
        <!-- Izquierda: Nombre & Copyright -->
        <div class="flex flex-col items-center md:items-start space-y-1">
          <div id="footer-company-name" class="text-white font-bold text-sm tracking-tight">${companyName}</div>
          <p id="footer-copyright" class="text-slate-400 text-[11px]">${copyrightText}</p>
        </div>

        <!-- Derecha: Enlaces horizontales -->
        <nav class="flex flex-wrap justify-center gap-6 font-bold uppercase tracking-wider text-[11px] text-slate-300" aria-label="Enlaces del pie de página">
          <a class="hover:text-white transition-colors cursor-pointer" onclick="alert('Política de Privacidad en actualización legal.')">POLÍTICA DE PRIVACIDAD</a>
          <a class="hover:text-white transition-colors cursor-pointer" onclick="alert('Términos de Venta en actualización.')">TÉRMINOS DE VENTA</a>
          <a class="hover:text-white transition-colors" href="nosotros.html">RED DE DISTRIBUIDORES</a>
          <a class="hover:text-white transition-colors" href="soporte.html">SOPORTE TÉCNICO</a>
          <a class="hover:text-white transition-colors" href="https://wa.me/573000000000?text=Hola,%20requiero%20hablar%20con%20un%20especialista." target="_blank" rel="noopener noreferrer">CONTACTAR ESPECIALISTA</a>
        </nav>
      </div>
    </footer>`;
}

/* ── Carousel Engine ── */
function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progress-bar");
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  function updateProgressBar() {
    if (!progressBar) return;
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.transition = "width 5000ms linear";
      progressBar.style.width = "100%";
    }, 50);
  }

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(ind => {
      ind.classList.remove("bg-white", "active-indicator");
      ind.classList.add("bg-white/30");
    });
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove("bg-white/30");
      indicators[currentSlide].classList.add("bg-white", "active-indicator");
    }
    updateProgressBar();
  }

  function nextSlideFn() { showSlide(currentSlide + 1); }

  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlideFn, 5000);
    updateProgressBar();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlideFn(); startAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { showSlide(currentSlide - 1); startAutoSlide(); });
  indicators.forEach((ind, i) => ind.addEventListener("click", () => { showSlide(i); startAutoSlide(); }));

  startAutoSlide();
}

/* ── Cart Engine ── */
let cartItems = JSON.parse(localStorage.getItem('maquitec_cart')) || [];

function saveCart() {
  localStorage.setItem('maquitec_cart', JSON.stringify(cartItems));
}

window.toggleCart = function() {
  const dropdown = document.getElementById('cart-dropdown');
  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    setTimeout(() => dropdown.classList.remove('opacity-0'), 10);
    renderCart();
  } else {
    dropdown.classList.add('opacity-0');
    setTimeout(() => dropdown.classList.add('hidden'), 200);
  }
}

window.addToCart = function(e, productData) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  const pData = productData || {
    name: "Máquina de Coser Industrial Automática",
    price: 4850.00,
    img: ""
  };

  const existingItem = cartItems.find(item => item.name === pData.name);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cartItems.push({ ...pData, quantity: 1 });
  }
  
  saveCart();
  updateCartBadge();
  renderCart();
  
  const btn = e ? e.currentTarget : null;
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
    btn.classList.add('bg-green-600', 'text-white');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-green-600', 'text-white');
    }, 1000);
  }
}

window.updateQuantity = function(index, delta) {
  if (cartItems[index]) {
    cartItems[index].quantity = (cartItems[index].quantity || 1) + delta;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    saveCart();
    updateCartBadge();
    renderCart();
  }
}

window.removeFromCart = function(index) {
  cartItems.splice(index, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    badge.innerText = totalCount;
    if (totalCount === 0) {
      badge.classList.add('hidden');
    } else {
      badge.classList.remove('hidden');
      badge.classList.remove('animate-scale-in');
      void badge.offsetWidth;
      badge.classList.add('animate-scale-in');
    }
  }
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const countLabel = document.getElementById('cart-total-items');
  const priceLabel = document.getElementById('cart-total-price');
  if (!container || !countLabel || !priceLabel) return;
  
  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  countLabel.innerText = totalCount + (totalCount === 1 ? " item" : " items");
  
  if (cartItems.length === 0) {
    container.innerHTML = '<div class="p-4 text-center text-sm text-slate-500">El carrito está vacío.</div>';
    priceLabel.innerText = "$0.00";
    return;
  }
  
  let total = 0;
  container.innerHTML = cartItems.map((item, idx) => {
    const qty = item.quantity || 1;
    total += (item.price * qty);
    const formattedPrice = window.formatCurrency(item.price);
    return `
      <div class="flex items-center gap-3 p-2 border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low transition-colors rounded-lg">
        <img src="${item.img}" class="w-12 h-12 object-cover rounded bg-surface" alt="${item.name}">
        <div class="flex-1 min-w-0 text-left">
          <p class="text-xs font-bold text-primary truncate" title="${item.name}">${item.name}</p>
          <p class="text-[10px] text-on-surface-variant">${formattedPrice} c/u</p>
          <div class="flex items-center mt-1 bg-surface-container w-fit rounded border border-outline-variant/20">
            <button onclick="updateQuantity(${idx}, -1)" class="px-2 py-0.5 hover:text-primary transition-colors text-xs font-bold" aria-label="Disminuir cantidad">-</button>
            <span class="px-2 py-0.5 text-xs font-bold text-primary border-x border-outline-variant/20 min-w-[24px] text-center">${qty}</span>
            <button onclick="updateQuantity(${idx}, 1)" class="px-2 py-0.5 hover:text-primary transition-colors text-xs font-bold" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${idx})" class="text-error/50 hover:text-error transition-colors p-1 self-start mt-1" title="Eliminar">
          <span class="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>
    `;
  }).join('');
  
  priceLabel.innerText = window.formatCurrency(total);
}

window.toggleUserMenu = function() {
  const dropdown = document.getElementById('user-dropdown');
  if (!dropdown) return;
  if (dropdown.classList.contains('hidden')) {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown && !cartDropdown.classList.contains('hidden')) toggleCart();
    
    dropdown.classList.remove('hidden');
    setTimeout(() => dropdown.classList.remove('opacity-0'), 10);
  } else {
    dropdown.classList.add('opacity-0');
    setTimeout(() => dropdown.classList.add('hidden'), 200);
  }
}

// Utilidad para formatear precios con separadores de miles
window.formatCurrency = function(value) {
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  if (isNaN(num)) return value;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// Cierra los dropdowns al hacer clic afuera
document.addEventListener('click', (e) => {
  // Carrito
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartBtn = document.getElementById('cart-toggle-btn');
  if (cartDropdown && !cartDropdown.classList.contains('hidden')) {
    if (!cartDropdown.contains(e.target) && (!cartBtn || !cartBtn.contains(e.target))) {
      toggleCart();
    }
  }
  
  // Usuario
  const userDropdown = document.getElementById('user-dropdown');
  const userBtn = document.getElementById('user-toggle-btn');
  if (userDropdown && !userDropdown.classList.contains('hidden')) {
    if (!userDropdown.contains(e.target) && (!userBtn || !userBtn.contains(e.target))) {
      toggleUserMenu();
    }
  }
});

/* ── Estilos de Carga Suave ── */
const style = document.createElement('style');
style.innerHTML = `
  .cms-loading { opacity: 0; }
  .cms-loaded { opacity: 1; transition: opacity 0.4s ease-in-out; }
`;
document.head.appendChild(style);

/* ── CMS Data Engine (Persistencia Profesional) ── */
async function initCMSData() {
  // Ocultar contenido mientras carga
  const mainContent = document.querySelector('main') || document.body;
  mainContent.classList.add('cms-loading');

  if (!window.CMS_DB) {
    console.warn("⚠️ Servicio de DB no disponible. Usando datos hardcoded.");
    mainContent.classList.remove('cms-loading');
    return;
  }

  try {
    const data = await window.CMS_DB.getAllData();
    
    if (data.products && data.products.length > 0) {
      window.PRODUCTS = data.products;
    }
    if (data.team && data.team.length > 0) {
      window.TEAM_MEMBERS = data.team;
    }
    if (data.services && data.services.length > 0) {
      window.SERVICES_DATA = data.services;
    }
    if (data.brands && data.brands.length > 0) {
      window.BRANDS = data.brands;
    }
    // Categorías - Forzar limpieza de basura anterior solo si detectamos conflicto
    if (data.categories && data.categories.length > 0) {
      localStorage.removeItem('maquitec_categories'); // Limpiar caché vieja
      window.SIDEBAR_CATEGORIES = data.categories;
      console.log("Categorías sincronizadas con PostgreSQL.");
    }

    // Carrusel
    if (data.carousel && data.carousel.length > 0) {
      window.CAROUSEL_SLIDES = data.carousel;
    }

    // Textos CMS
    if (data.texts) {
      window.CMS_TEXTS = data.texts;
      applyTheme(); // Aplicar colores personalizados si existen
      Object.keys(data.texts).forEach(key => {
        const val = data.texts[key];
        // Buscar elementos por ID exacto o por ID con sufijo -link
        const elements = document.querySelectorAll(`[id="${key}"], [id="${key}-link"]`);
        
        elements.forEach(el => {
          const id = el.id;
          if (el.tagName === 'IMG' || id.includes('img') || id.includes('preview')) {
            if (el.tagName === 'IMG') el.src = val;
            else el.style.backgroundImage = `url(${val})`;
          } else if (el.tagName === 'IFRAME') {
            el.src = val;
          } else if (el.tagName === 'A') {
            if (val.startsWith('http') || val.startsWith('tel:') || val.startsWith('mailto:')) {
              el.href = val;
            } else if (id.includes('wa')) {
              el.href = `https://wa.me/${val.replace(/\D/g, '')}`;
            } else if (id.includes('phone')) {
              el.href = `tel:${val.replace(/\D/g, '')}`;
            } else if (id.includes('email')) {
              el.href = `mailto:${val}`;
            } else {
              el.href = val;
            }
          } else {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val;
            else el.innerText = val;
          }
        });
      });
    }
    
    // Disparar evento para que otras scripts sepan que los datos están listos
    document.dispatchEvent(new CustomEvent('cmsDataReady'));
    
  } catch (e) {
    console.error("Error cargando datos desde Postgres:", e);
  } finally {
    // Mostrar contenido con transición
    const mainContent = document.querySelector('main') || document.body;
    mainContent.classList.remove('cms-loading');
    mainContent.classList.add('cms-loaded');
  }
}

/* ── Aplicar Tema Dinámico ── */
function applyTheme() {
  if (!window.CMS_TEXTS) return;
  const root = document.documentElement;
  
  // Colores de marca
  const colorMap = {
    'primary':           'theme-color-primary',
    'secondary':         'theme-color-secondary',
    'brand':             'theme-color-brand',
    'accent':            'theme-color-accent',
    'background':        'theme-color-background',
    'surface':           'theme-color-surface',
    'surface-container': 'theme-color-surface-container',
    'card':              'theme-color-card',
    'navbar':            'theme-color-navbar',
    'footer':            'theme-color-footer',
    'text':              'theme-color-text',
    'on-primary':        'theme-color-on-primary',
    'text-secondary':    'theme-color-text-secondary',
    'footer-text':       'theme-color-footer-text'
  };

  Object.keys(colorMap).forEach(cssVar => {
    const cmsKey = colorMap[cssVar];
    const val = window.CMS_TEXTS[cmsKey];
    if (val) root.style.setProperty(`--color-${cssVar}`, val);
  });

  // Aplicar colores directos a elementos específicos
  const navbar = document.getElementById('main-nav');
  const navbarColor = window.CMS_TEXTS['theme-color-navbar'];
  if (navbar && navbarColor) {
    navbar.style.backgroundColor = navbarColor;
  }

  // Fuentes
  const headlineFont = window.CMS_TEXTS['theme-font-headline'];
  const bodyFont = window.CMS_TEXTS['theme-font-body'];

  if (headlineFont || bodyFont) {
    // Cargar fuentes de Google Fonts dinámicamente
    const families = [];
    if (headlineFont && headlineFont !== 'Manrope') families.push(headlineFont);
    if (bodyFont && bodyFont !== 'Inter') families.push(bodyFont);
    
    if (families.length > 0) {
      const familyParam = families.map(f => f.replace(/\s/g, '+') + ':wght@400;500;600;700;800').join('&family=');
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${familyParam}&display=swap`;
      document.head.appendChild(link);
    }

    if (headlineFont) {
      root.style.setProperty('--font-headline', headlineFont);
      document.querySelectorAll('.font-manrope, [class*="font-headline"]').forEach(el => {
        el.style.fontFamily = headlineFont;
      });
    }
    if (bodyFont) {
      root.style.setProperty('--font-body', bodyFont);
      document.body.style.fontFamily = `${bodyFont}, sans-serif`;
    }
  }
}

/* ── Init on DOM Ready ── */
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar datos del CMS antes de cualquier cosa
  await initCMSData();

  const page = document.body.getAttribute("data-page") || "inventario";
  renderNavbar(page);
  renderFooter();
  
  // Init cart state on load
  updateCartBadge();
  renderCart();
});
