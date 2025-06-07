/**
 * Language management system
 */
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
    
    // Close mobile menu if open
    document.getElementById('nav-center').classList.remove('active');
}

async function changeLanguage(lang) {
    if (lang === currentLanguage) return;
    
    try {
        // Update UI immediately
        document.getElementById('current-lang').textContent = lang.toUpperCase();
        currentLanguage = lang;
        
        // Update all language-aware elements
        updateTextContent(lang);
        
        // Reload current page content in new language
        await loadPage(currentPage);
        
    } catch (error) {
        console.error('Error changing language:', error);
    } finally {
        document.getElementById('language-dropdown').classList.remove('show');
    }
}

function updateTextContent(lang) {
    // Update elements with data attributes
    document.querySelectorAll('[data-es], [data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title');
    const newTitle = titleElement.getAttribute(`data-${lang}`) || 
                    `${document.querySelector('.logo').textContent} - ${lang === 'es' ? 'Ingeniero en Sistemas' : 'Systems Engineer'}`;
    titleElement.textContent = newTitle;
}

// Initialize language system
document.addEventListener('DOMContentLoaded', function() {
    // Set default language from browser or cookie
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'es' || browserLang === 'en') {
        changeLanguage(browserLang);
    }
});
