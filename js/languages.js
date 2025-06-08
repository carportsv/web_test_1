// Language Switcher System
let currentLang = 'es';

// Cambia el idioma de la interfaz
function changeLanguage(lang) {
    currentLang = lang;
    document.getElementById('current-lang').textContent = lang.toUpperCase();

    // Cambia el texto de los elementos con data-es y data-en
    document.querySelectorAll('[data-es], [data-en]').forEach(el => {
        if (lang === 'es' && el.dataset.es) {
            el.textContent = el.dataset.es;
        } else if (lang === 'en' && el.dataset.en) {
            el.textContent = el.dataset.en;
        }
    });

    // Opcional: cambia el placeholder de los inputs
    document.querySelectorAll('[data-es-placeholder], [data-en-placeholder]').forEach(el => {
        if (lang === 'es' && el.dataset.esPlaceholder) {
            el.placeholder = el.dataset.esPlaceholder;
        } else if (lang === 'en' && el.dataset.enPlaceholder) {
            el.placeholder = el.dataset.enPlaceholder;
        }
    });

    // Cambia el título del documento si corresponde
    if (lang === 'en') {
        document.title = "Your Name - Systems Engineer";
    } else {
        document.title = "Tu Nombre - Ingeniero en Sistemas";
    }
}

// Muestra/oculta el menú de idiomas
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
}

// Cierra el menú de idiomas si se hace click fuera
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('language-dropdown');
    const langBtn = document.querySelector('.language-btn');
    if (dropdown && langBtn && !dropdown.contains(event.target) && !langBtn.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});
