let currentPage = 'home';
let currentLanguage = 'es';

function loadPage(pageId) {
    fetch(`pages/${pageId}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Página no encontrada');
            return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            currentPage = pageId;
            updateActiveNavigation(pageId);
            document.getElementById('nav-center').classList.remove('active');
            changeLanguage(currentLanguage); // Actualizar idioma
        })
        .catch(error => {
            console.error('Error:', error);
            if (pageId !== 'home') loadPage('home');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
    
    document.querySelectorAll('.nav-link').forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('onclick').replace("loadPage('", "").replace("')", "");
            loadPage(pageId);
        });
    });
});
