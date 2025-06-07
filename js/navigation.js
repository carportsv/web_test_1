function updateActiveNavigation(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('onclick').replace("loadPage('", "").replace("')", "");
        if (linkPage === pageId) link.classList.add('active');
    });
}

function toggleMobileMenu() {
    document.getElementById('nav-center').classList.toggle('active');
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-center') && !event.target.closest('.mobile-menu-toggle')) {
        document.getElementById('nav-center').classList.remove('active');
    }
});
