// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load the home page by default
    loadPage('inicio');
    
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
            
            loadPage(pageId);
        });
    });

    // Add some interactive effects
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
});

// Global variables
let currentPage = 'inicio';

// Function to load page content
function loadPage(pageId) {
    fetch(`pages/${pageId}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            currentPage = pageId;
            updateActiveNavigation(pageId);
            
            // Close mobile menu if open
            const navCenter = document.getElementById('nav-center');
            navCenter.classList.remove('active');
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
