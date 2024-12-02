document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to English
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Create language switcher button
    const createLanguageSwitcher = () => {
        const navControls = document.querySelector('.nav-controls');
        const hamburger = navControls.querySelector('.hamburger');
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
        `;
        navControls.insertBefore(switcher, hamburger);

        // Add click event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                if (lang !== currentLang) {
                    currentLang = lang;
                    localStorage.setItem('language', lang);
                    updateLanguage();
                    updateButtonStates();
                }
            });
        });
    };

    // Update active state of language buttons
    const updateButtonStates = () => {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    };

    // Update text content based on translations
    const updateLanguage = () => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const keys = key.split('.');
            let value = translations[currentLang];
            
            // Navigate through nested objects
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    console.warn(`Translation missing for key: ${key}`);
                    return;
                }
            }

            // Update text content or placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        });
    };

    // Initialize
    createLanguageSwitcher();
    updateLanguage();
});
