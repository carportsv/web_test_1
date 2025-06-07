// Navigation functions
function updateActiveNavigation(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the corresponding nav link
    navLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        if ((pageId === 'inicio' && (linkText.includes('inicio') || linkText.includes('home'))) ||
            (pageId === 'sobre-mi' && (linkText.includes('sobre') || linkText.includes('about'))) ||
            (pageId === 'servicios' && (linkText.includes('servicios') || linkText.includes('services'))) ||
            (pageId === 'portfolio' && linkText.includes('portfolio')) ||
            (pageId === 'contacto' && (linkText.includes('contacto') || linkText.includes('contact')))) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    const navCenter = document.getElementById('nav-center');
    navCenter.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    // Close mobile menu when clicking outside
    const navCenter = document.getElementById('nav-center');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!navCenter.contains(event.target) && !mobileToggle.contains(event.target)) {
        navCenter.classList.remove('active');
    }
});
