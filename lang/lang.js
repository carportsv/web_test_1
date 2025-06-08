// Sistema de carga de idiomas centralizado

// Función para cargar y aplicar el idioma (traduce TODO lo que tenga id en el diccionario)
async function setLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const texts = await response.json();

    // Recorre TODAS las claves del diccionario y traduce si existe el id en el DOM
    Object.keys(texts).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === 'document-title') {
          document.title = texts[id];
        } else {
          el.textContent = texts[id];
        }
      }
    });

    // Actualiza el indicador visual de idioma
    const currentLang = document.getElementById('current-lang');
    if (currentLang) currentLang.textContent = lang.toUpperCase();

    // Guarda preferencia
    localStorage.setItem('lang', lang);

    // Marca el botón activo en el menú de idiomas (opcional)
    document.querySelectorAll('.language-dropdown button').forEach(btn => {
      // Si usas changeLanguage('xx') en el onclick de los botones:
      btn.classList.toggle('active', btn.getAttribute('onclick') === `changeLanguage('${lang}')`);
      // Si usas setLanguage('xx') en el onclick, reemplaza arriba por:
      // btn.classList.toggle('active', btn.getAttribute('onclick') === `setLanguage('${lang}')`);
    });
  } catch (e) {
    console.error('Error cargando el idioma', lang, e);
  }
}

// Permite cambiar idioma desde cualquier lugar llamando changeLanguage('xx')
function changeLanguage(lang) {
  setLanguage(lang);
  // Si quieres que el menú desplegable se oculte al cambiar idioma:
  const dropdown = document.getElementById('language-dropdown');
  if (dropdown) dropdown.classList.remove('show');
}

// Inicializar idioma al cargar la página (desde localStorage o español por defecto)
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'es';
  setLanguage(saved);
});

// Exponer funciones globalmente
window.setLanguage = setLanguage;
window.changeLanguage = changeLanguage;
