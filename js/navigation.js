/**
 * Page navigation system
 */
const pageMap = {
    'home': 'pages/home.html',
    'about': 'pages/about.html',
    'services': 'pages/services.html',
    'portfolio': 'pages/portfolio.html',
    'contact': 'pages/contact.html'
};

// Load page content dynamically
async function loadPage(pageId) {
    if (!pageMap[pageId]) {
        console.error(`Página no encontrada: ${pageId}`);
        return;
    }

    try {
        // Show loading state
        document.getElementById('main-content').innerHTML = `
            <div class="loading-animation">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        `;

        // Load page content
        const response = await fetch(pageMap[pageId]);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const html = await response.text();
        
        // Update content
        document.getElementById('main-content').innerHTML = html;
        window.currentPage = pageId;
        window.history.pushState({}, '', `#${pageId}`);
        
        // Update UI
        updateActiveNavigation(pageId);
        if (typeof initializeInteractiveEffects === 'function') {
            initializeInteractiveEffects();
        }
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="error-message">
                <h2>Error al cargar la página</h2>
                <p>${error.message}</p>
                <button onclick="loadPage('home')">Volver al inicio</button>
            </div>
        `;
    }
}

// Update navigation active states
function updateActiveNavigation(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(`loadPage('${pageId}'`)) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    const navCenter = document.getElementById('nav-center');
    navCenter.classList.toggle('active');
    
    // Close language dropdown if open
    const langDropdown = document.getElementById('language-dropdown');
    if (langDropdown) langDropdown.classList.remove('show');
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const pageFromHash = window.location.hash.substring(1) || 'home';
    loadPage(pageFromHash);
});
