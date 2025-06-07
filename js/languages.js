function toggleLanguageDropdown() {
    document.getElementById('language-dropdown').classList.toggle('show');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('current-lang').textContent = lang.toUpperCase();
    
    document.querySelectorAll('[data-es], [data-en]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    document.getElementById('language-dropdown').classList.remove('show');
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.language-selector')) {
        document.getElementById('language-dropdown').classList.remove('show');
    }
});
