// Estado de la navegación
let currentPage = 'inicio';
let isLoading = false;

// Mapeo de páginas
const pageMap = {
    'inicio': 'pages/inicio.html',
    'sobre-mi': 'pages/sobre-mi.html',
    'servicios': 'pages/servicios.html',
    'portfolio': 'pages/portfolio.html',
    'contacto': 'pages/contacto.html'
};

// Función principal para mostrar páginas
async function showPage(pageId) {
    if (isLoading || currentPage === pageId) return;
    
    isLoading = true;
    const mainContent = document.getElementById('main-content');
    
    try {
        // Mostrar loading
        showLoading();
        
        // Cargar contenido de la página
        const response = await fetch(pageMap[pageId]);
        if (!response.ok) throw new Error(`Error loading page: ${response.status}`);
        
        const html = await response.text();
        
        // Aplicar transición suave
        await smoothTransition(() => {
            mainContent.innerHTML = html;
            currentPage = pageId;
            updateActiveNavigation(pageId);
            
            // Aplicar traducciones si es necesario
            if (currentLanguage !== 'es') {
                updateLanguageContent();
            }
            
            // Ejecutar scripts específicos de la página si existen
            executePageScript(pageId);
        });
        
    } catch (error) {
        console.error('Error loading page:', error);
        mainContent.innerHTML = '<div class="loading">Error al cargar la página</div>';
    } finally {
        isLoading = false;
    }
}

// Función para mostrar loading
function showLoading() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="loading">Cargando...</div>';
}

// Transición suave entre páginas
async function smoothTransition(callback) {
    const mainContent = document.getElementById('main-content');
    
    // Fade out
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateX(-20px)';
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Ejecutar callback (cambiar contenido)
    callback();
    
    // Fade in
    await new Promise(resolve => setTimeout(resolve, 50));
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateX(0)';
}

// Actualizar navegación activa
function updateActiveNavigation(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Encontrar y activar el enlace correspondiente
    navLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const isActive = checkIfLinkActive(pageId, linkText);
        if (isActive) {
            link.classList.add('active');
        }
    });
    
    // Cerrar menú móvil si está abierto
    const navCenter = document.getElementById('nav-center');
    navCenter.classList.remove('active');
}

// Verificar si el enlace debe estar activo
function checkIfLinkActive(pageId, linkText) {
    const activeConditions = {
        'inicio': () => linkText.includes('inicio') || linkText.includes('home'),
        'sobre-mi': () => linkText.includes('sobre') || linkText.includes('about'),
        'servicios': () => linkText.includes('servicios') || linkText.includes('services'),
        'portfolio': () => linkText.includes('portfolio'),
        'contacto': () => linkText.includes('contacto') || linkText.includes('contact')
    };
    
    return activeConditions[pageId] ? activeConditions[pageId]() : false;
}

// Ejecutar scripts específicos de cada página
function executePageScript(pageId) {
    switch(pageId) {
        case 'inicio':
            initHeroAnimations();
            break;
        case 'sobre-mi':
            initSkillsAnimations();
            break;
        case 'servicios':
            initServicesAnimations();
            break;
        case 'portfolio':
            initPortfolioAnimations();
            break;
        case 'contacto':
            initContactAnimations();
            break;
    }
}

// Animaciones específicas para cada página
function initHeroAnimations() {
    // Efecto parallax para hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallaxHandler = () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        };
        
        window.addEventListener('scroll', parallaxHandler);
        
        // Limpiar evento al cambiar de página
        setTimeout(() => {
            window.removeEventListener('scroll', parallaxHandler);
        }, 1000);
    }
}

function initSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

function initServicesAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
}

function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

// Funciones del menú móvil
function toggleMobileMenu() {
    const navCenter = document.getElementById('nav-center');
    navCenter.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function(event) {
    const navCenter = document.getElementById('nav-center');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navCenter.contains(event
