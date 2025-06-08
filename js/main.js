// Inicializador principal
document.addEventListener('DOMContentLoaded', function() {
    const pageFromHash = window.location.hash.substring(1) || 'home';
    loadPage(pageFromHash);
});

// Navegación interna: recarga la página al cambiar el hash
window.addEventListener('hashchange', function() {
    const pageFromHash = window.location.hash.substring(1) || 'home';
    loadPage(pageFromHash);
});

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            // Aplica idioma actual a los nuevos textos cargados
            const lang = localStorage.getItem('lang') || 'es';
            setLanguage(lang);
            // Inicializa efectos interactivos sobre el nuevo contenido
            initializeInteractiveEffects();
        });
}

// Selector de idioma: muestra/oculta el menú usando CLASE .show
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('show');
}

// Cierra el menú si haces clic fuera
document.addEventListener('click', function (e) {
    const btn = document.querySelector('.language-btn');
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown || !btn) return;
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Cambia el idioma y lo guarda
function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    setLanguage(lang);
    // Actualiza el texto del botón
    const langMap = { es: 'ES', en: 'EN', fr: 'FR', it: 'IT', de: 'DE' };
    document.getElementById('current-lang').textContent = langMap[lang] || lang.toUpperCase();
    // Oculta el dropdown
    document.getElementById('language-dropdown').classList.remove('show');
}

// Aplica el idioma actual a todos los elementos traducibles
async function setLanguage(lang) {
    try {
        // Carga el archivo de idioma (JSON)
        const response = await fetch(`lang/${lang}.json`);
        const dict = await response.json();

        // Cambia los textos según los ids
        for (const key in dict) {
            const el = document.getElementById(key);
            if (el) {
                el.textContent = dict[key];
            }
        }

        // Cambia el título del documento si está en el diccionario
        if (dict["document-title"]) {
            document.title = dict["document-title"];
        }

        // Actualiza el valor visible del idioma actual
        const langMap = { es: 'ES', en: 'EN', fr: 'FR', it: 'IT', de: 'DE' };
        const currentLang = document.getElementById('current-lang');
        if (currentLang) {
            currentLang.textContent = langMap[lang] || lang.toUpperCase();
        }
    } catch (err) {
        console.error("No se pudo cargar el idioma:", lang, err);
    }
}

// Ejemplo de función de efectos interactivos
function initializeInteractiveEffects() {
    // Aquí puedes agregar cualquier JS adicional para efectos tras cargar la página
    // Por ejemplo: animaciones, tooltips, listeners de tarjetas, etc.
    // Este bloque es completamente personalizable.
}
