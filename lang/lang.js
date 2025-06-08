// Sistema de carga de idiomas centralizado

// Lista de IDs que serán traducidos
const translatableIds = [
  'nav-home',
  'nav-about',
  'nav-services',
  'nav-portfolio',
  'nav-contact',
  'logo-text',
  'footer-rights',
  'loading-text',
  'document-title'
];

// Función para cargar y aplicar el idioma
async function setLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const texts = await response.json();

    // Actualiza los textos según el ID
    translatableIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && texts[id]) {
        if (id === 'document-title') {
          document.title = texts[id];
        } else {
          el.textContent = texts[id];
        }
      }
    });

    // Actualiza el indicador de idioma
    const currentLang = document.getElementById('current-lang');
    if (currentLang) currentLang.textContent = lang.toUpperCase();

    // Guarda la preferencia
    localStorage.setItem('lang', lang);

    // Marca el botón activo en el menú de idiomas
    document.querySelectorAll('.language-dropdown button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick') === `setLanguage('${lang}')`);
    });
  } catch (e) {
    console.error('Error cargando el idioma', lang, e);
  }
}

// Inicializar idioma al cargar la página (desde localStorage o español por defecto)
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'es';
  setLanguage(saved);
});

// Permite cambiar idioma desde cualquier lugar llamando setLanguage('xx')
window.setLanguage = setLanguage;
