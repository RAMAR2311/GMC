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
        "on-tertiary-fixed-variant": "#394857",
        "surface": "#f8f9fa",
        "on-tertiary-fixed": "#0d1d2a",
        "surface-container-high": "#e7e8e9",
        "on-secondary-container": "#3f5881",
        "on-surface-variant": "#444650",
        "error-container": "#ffdad6",
        "on-surface": "#191c1d",
        "primary-fixed": "#dbe1ff",
        "on-background": "#191c1d",
        "surface-container-lowest": "#ffffff",
        "tertiary": "#051522",
        "on-secondary-fixed": "#001b3d",
        "inverse-surface": "#2e3132",
        "background": "#f8f9fa",
        "surface-container-low": "#f3f4f5",
        "tertiary-fixed": "#d4e4f6",
        "surface-dim": "#d9dadb",
        "outline": "#757682",
        "surface-tint": "#435b9f",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#8191a2",
        "primary": "#00113a",
        "surface-container": "#edeeef",
        "secondary-fixed": "#d6e3ff",
        "on-secondary-fixed-variant": "#2e476f",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "primary-container": "#002366",
        "surface-bright": "#f8f9fa",
        "surface-container-highest": "#e1e3e4",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#00174a",
        "secondary-container": "#b6d0ff",
        "inverse-primary": "#b3c5ff",
        "secondary": "#465f88",
        "error": "#ba1a1a",
        "on-primary": "#ffffff",
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
        label: ["Inter"]
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
    { label: "Inventario", href: "index.html", id: "inventario" },
    { label: "Nosotros", href: "nosotros.html", id: "nosotros" },
    { label: "Servicios", href: "servicios.html", id: "servicios" },
    { label: "Soporte", href: "soporte.html", id: "soporte" }
  ];

  const linksHTML = navLinks.map(link => {
    const isActive = link.id === activePage;
    const classes = isActive
      ? "font-manrope tracking-tight font-bold text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400 pb-1 transition-all"
      : "font-manrope tracking-tight font-bold text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors";
    return `<a class="${classes}" href="${link.href}">${link.label}</a>`;
  }).join("");

  const mobileLinksHTML = navLinks.map(link => {
    const isActive = link.id === activePage;
    const classes = isActive
      ? "block px-4 py-3 font-manrope font-bold text-blue-900 bg-blue-50 rounded-lg"
      : "block px-4 py-3 font-manrope font-bold text-slate-600 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition-colors";
    return `<a class="${classes}" href="${link.href}" onclick="closeMobileMenu()">${link.label}</a>`;
  }).join("");

  const navbar = document.getElementById("navbar-placeholder");
  if (!navbar) return;

  navbar.innerHTML = `
    <nav id="main-nav" class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none transition-all duration-300" role="navigation" aria-label="Navegación principal">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="index.html" class="text-lg sm:text-xl font-black tracking-tighter text-blue-950 dark:text-white uppercase font-manrope flex-shrink-0" aria-label="Ir al inicio">
          Grupo Capital Máquinas
        </a>
        <!-- Desktop Nav Links -->
        <div class="hidden md:flex items-center space-x-8">${linksHTML}</div>
        <!-- Actions -->
        <div class="flex items-center space-x-4 sm:space-x-6">
          <div class="relative">
            <button id="cart-toggle-btn" onclick="toggleCart()" class="text-blue-900 dark:text-blue-400 active:scale-90 transition-all duration-150 relative" aria-label="Carrito de compras" title="Ver carrito">
              <span class="material-symbols-outlined">shopping_cart</span>
              <span id="cart-badge" class="absolute -top-1.5 -right-1.5 bg-error text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
            </button>
            <!-- Dropdown del Carrito -->
            <div id="cart-dropdown" class="absolute right-0 mt-4 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-outline-variant/20 hidden opacity-0 transition-opacity duration-200 z-50">
              <div class="p-4 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 class="font-bold text-primary font-headline">Mi Carrito</h3>
                <span id="cart-total-items" class="text-xs text-on-surface-variant font-bold bg-surface-container px-2 py-1 rounded-md">0 items</span>
              </div>
              <div id="cart-items-container" class="max-h-64 overflow-y-auto p-2">
                <div class="p-4 text-center text-sm text-slate-500">El carrito está vacío.</div>
              </div>
              <div class="p-4 border-t border-outline-variant/10 bg-surface-container-lowest rounded-b-xl">
                <div class="flex justify-between mb-4">
                  <span class="text-sm font-bold text-on-surface-variant">Total Estimado:</span>
                  <span id="cart-total-price" class="text-lg font-black text-primary">$0.00</span>
                </div>
                <button class="w-full py-3 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-primary-container transition-all active:scale-95">Ir a Pagar</button>
              </div>
            </div>
          </div>
          <!-- User Menu -->
          <div class="relative">
            <button id="user-toggle-btn" onclick="toggleUserMenu()" class="text-blue-900 dark:text-blue-400 active:scale-90 transition-all duration-150 flex items-center" aria-label="Mi Cuenta">
              <span class="material-symbols-outlined">person</span>
            </button>
            <div id="user-dropdown" class="absolute right-0 mt-4 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-outline-variant/20 hidden opacity-0 transition-opacity duration-200 z-50">
              <div class="py-2">
                <div class="px-4 py-2 border-b border-outline-variant/10 mb-1">
                  <p class="text-sm font-bold text-primary">Mi Cuenta</p>
                  <p class="text-xs text-slate-500">Invitado</p>
                </div>
                <a href="#" onclick="alert('La sección de Mi Perfil está en construcción.'); toggleUserMenu(); return false;" class="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"><span class="material-symbols-outlined align-middle mr-3 text-[18px] text-slate-400">account_circle</span>Mi Perfil</a>
                <a href="#" onclick="alert('El historial de pedidos estará disponible pronto.'); toggleUserMenu(); return false;" class="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"><span class="material-symbols-outlined align-middle mr-3 text-[18px] text-slate-400">receipt_long</span>Mis Pedidos</a>
                <div class="border-t border-outline-variant/10 my-1"></div>
                <a href="login.html" class="block px-4 py-2 text-sm text-error hover:bg-error-container transition-colors font-semibold"><span class="material-symbols-outlined align-middle mr-3 text-[18px]">logout</span>Iniciar Sesión</a>
              </div>
            </div>
          </div>
          <!-- Mobile Menu Toggle -->
          <button id="mobile-menu-btn" class="md:hidden text-blue-900 dark:text-blue-400 active:scale-90 transition-all" aria-label="Abrir menú" onclick="toggleMobileMenu()">
            <span class="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 h-[1px] w-full"></div>
      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1 shadow-lg">
        ${mobileLinksHTML}
        <div class="flex items-center bg-surface-container-low px-4 py-2 rounded-full mt-4 border border-outline-variant/20">
          <span class="material-symbols-outlined text-outline">search</span>
          <input class="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full" placeholder="Buscar inventario..." type="text" aria-label="Buscar en inventario (móvil)"/>
        </div>
      </div>
    </nav>`;
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}
function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.add("hidden");
}

/* ── Inyectar Footer ── */
function renderFooter() {
  const footer = document.getElementById("footer-placeholder");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="w-full py-12 px-4 sm:px-8 bg-blue-950 dark:bg-black border-t border-white/10" role="contentinfo">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col items-center md:items-start">
          <div class="text-white font-manrope font-black text-lg mb-2">Grupo Capital Máquinas</div>
          <p class="font-body text-xs tracking-wider uppercase text-slate-400 text-center md:text-left">© 2026 Grupo Capital Máquinas. Confiabilidad de Grado Arquitectónico.</p>
        </div>
        <nav class="flex flex-wrap justify-center gap-4 sm:gap-6" aria-label="Enlaces del pie de página">
          <a class="font-body text-xs tracking-wider uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer" onclick="alert('Nuestra Política de Privacidad se encuentra actualmente en actualización legal. Pronto estará disponible.')">Política de Privacidad</a>
          <a class="font-body text-xs tracking-wider uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer" onclick="alert('Los Términos de Venta están siendo actualizados para 2026.')">Términos de Venta</a>
          <a class="font-body text-xs tracking-wider uppercase text-slate-400 hover:text-white transition-colors duration-200" href="nosotros.html">Red de Distribuidores</a>
          <a class="font-body text-xs tracking-wider uppercase text-slate-400 hover:text-white transition-colors duration-200" href="soporte.html">Soporte Técnico</a>
          <a class="font-body text-xs tracking-wider uppercase text-slate-400 hover:text-white transition-colors duration-200" href="https://wa.me/573000000000?text=Hola,%20requiero%20hablar%20con%20un%20especialista." target="_blank" rel="noopener noreferrer">Contactar Especialista</a>
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBED4xZjhLsZPiYGkj7WAYVry8391BgDrBNpV8k7EdtxVIUPvHigzdYOc8MX4X-h1uUI_dUzUPbhTXsVJpgHtfQZEE-zTd2FSqtCT02xm9VMXvECp_LVUhNGtsrFzalrmYm0fTYq6FX6YoCx7Cp94HDZcAMjdL51cSXHLZlMbqTJykMbFkBgHDgBfJOLtUEtMg4Dgy7Ux4hbeFAc3u-TM6wccUWkNbafrF8jjGornsKrPBjIdDgkutyrarHKF8k8TrCYl4Askt0AyrH"
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
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);
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
  
  priceLabel.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
}

window.toggleUserMenu = function() {
  const dropdown = document.getElementById('user-dropdown');
  if (!dropdown) return;
  if (dropdown.classList.contains('hidden')) {
    // Cerrar carrito si está abierto
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown && !cartDropdown.classList.contains('hidden')) toggleCart();
    
    dropdown.classList.remove('hidden');
    setTimeout(() => dropdown.classList.remove('opacity-0'), 10);
  } else {
    dropdown.classList.add('opacity-0');
    setTimeout(() => dropdown.classList.add('hidden'), 200);
  }
}

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
      Object.keys(data.texts).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const val = data.texts[id];
          if (id.includes('img') || id.includes('preview')) {
            if (el.tagName === 'IMG') el.src = val;
            else el.style.backgroundImage = `url(${val})`;
          } else {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val;
            else el.innerText = val;
          }
        }
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
