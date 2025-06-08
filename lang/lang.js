// Cargar el idioma y aplicar los textos
async function setLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const texts = await response.json();

    // Aquí actualizas todos los textos dinámicamente según tu HTML
    document.getElementById('title').textContent = texts.title;
    document.getElementById('welcome').textContent = texts.welcome;
    document.getElementById('contact-btn').textContent = texts.contact;
    document.getElementById('footer-contact').textContent = texts.footerContact;

    // Guarda preferencia
    localStorage.setItem('lang', lang);

    // Botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  } catch (e) {
    console.error('Error cargando el idioma', lang, e);
  }
}

// Detectar idioma guardado o por defecto
const savedLang = localStorage.getItem('lang') || 'es';
setLanguage(savedLang);

// Eventos de botones
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});
