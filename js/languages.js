// Language management functions

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('show');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('current-lang').textContent = lang.toUpperCase();
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-es], [data-en]');
    elements.forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Close dropdown
    document.getElementById('language-dropdown').classList.remove('show');
}
