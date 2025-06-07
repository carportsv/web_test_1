/**
 * Main application initialization and utilities
 */
let currentLanguage = 'es';
let currentPage = 'inicio';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up initial page
    if (window.location.hash) {
        const pageFromHash = window.location.hash.substring(1);
        loadPage(pageFromHash);
    } else {
        loadPage('inicio');
    }

    // Initialize all interactive components
    initializeInteractiveEffects();
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const selector = document.querySelector('.language-selector');
        if (!selector.contains(event.target)) {
            document.getElementById('language-dropdown').classList.remove('show');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.getElementById('language-dropdown').classList.remove('show');
            document.getElementById('nav-center').classList.remove('active');
        }
    });
}

// Initialize all interactive effects
function initializeInteractiveEffects() {
    // Add hover effects to cards (will be re-initialized after page loads)
    initCardHoverEffects();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', handleParallaxEffect);
    
    // Initialize animations for current page
    initPageAnimations();
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

function handleParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero && currentPage === 'inicio') {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

function initPageAnimations() {
    // Initialize any page-specific animations
    const pageElement = document.getElementById(currentPage);
    if (pageElement) {
        pageElement.style.opacity = '1';
        pageElement.style.transform = 'translateX(0)';
    }
}
