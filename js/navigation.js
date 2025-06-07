// Page navigation functions

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update active navigation
        updateActiveNavigation(pageId);
        
        // Close mobile menu if open
        const navCenter = document.getElementById('nav-center');
        navCenter.classList.remove('active');
    }
}

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

// Smooth page transitions (alternative function)
function smoothShowPage(pageId) {
    const currentPageElement = document.querySelector('.page.active');
    const targetPageElement = document.getElementById(pageId);
    
    if (currentPageElement && targetPageElement && currentPageElement !== targetPageElement) {
        // Fade out current page
        currentPageElement.style.opacity = '0';
        currentPageElement.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            currentPageElement.classList.remove('active');
            targetPageElement.classList.add('active');
            
            // Fade in new page
            setTimeout(() => {
                targetPageElement.style.opacity = '1';
                targetPageElement.style.transform = 'translateX(0)';
            }, 50);
        }, 300);
        
        currentPage = pageId;
        updateActiveNavigation(pageId);
    }
}
