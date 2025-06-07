// Main application initialization and utilities
let currentLanguage = 'es';
let currentPage = 'inicio';

// Mobile menu functions
function toggleMobileMenu() {
    const navCenter = document.getElementById('nav-center');
    navCenter.classList.toggle('active');
}

// Close dropdowns and mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const selector = document.querySelector('.language-selector');
    if (!selector.contains(event.target)) {
        document.getElementById('language-dropdown').classList.remove('show');
    }
    
    // Close mobile menu when clicking outside
    const navCenter = document.getElementById('nav-center');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!navCenter.contains(event.target) && !mobileToggle.contains(event.target)) {
        navCenter.classList.remove('active');
    }
});

// Add interactive effects
function initializeInteractiveEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero && currentPage === 'inicio') {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the first page is active
    showPage('inicio');
    
    // Add click event listeners to all navigation buttons
    document.querySelectorAll('.nav-link').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            let pageId = 'inicio';
            
            if (buttonText.includes('sobre') || buttonText.includes('about')) {
                pageId = 'sobre-mi';
            } else if (buttonText.includes('servicios') || buttonText.includes('services')) {
                pageId = 'servicios';
            } else if (buttonText.includes('portfolio')) {
                pageId = 'portfolio';
            } else if (buttonText.includes('contacto') || buttonText.includes('contact')) {
                pageId = 'contacto';
            }
            
            showPage(pageId);
        });
    });
    
    // Initialize interactive effects
    initializeInteractiveEffects();
});
