document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to English
    let currentLang = localStorage.getItem('language') || 'en';

    // Base64 encoded flag images
    const flags = {
        en: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg==',
        fr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAHklEQVQ4jWNgYGD4TwzuaDhqwGhADRw1cNSAUQMAGFsAyXDQeHUAAAAASUVORK5CYII='
    };

    // Create language switcher button
    const createLanguageSwitcher = () => {
        const navControls = document.querySelector('.nav-controls');
        const hamburger = navControls.querySelector('.hamburger');
        const languageBtn = document.createElement('div');
        languageBtn.className = 'language-switcher';
        languageBtn.innerHTML = `
            <button class="language-btn">
                <img src="${flags.en}" alt="Language" id="currentLanguageFlag">
                <span id="currentLanguageCode">EN</span>
            </button>
            <div class="language-dropdown">
                <div class="language-option" data-lang="en">
                    <img src="${flags.en}" alt="English">
                    <span>English</span>
                </div>
                <div class="language-option" data-lang="fr">
                    <img src="${flags.fr}" alt="Français">
                    <span>Français</span>
                </div>
            </div>
        `;

        // Find the nav-controls section in the navbar
        if (navControls) {
            navControls.insertBefore(languageBtn, navControls.firstChild);
        }

        const languageDropdown = languageBtn.querySelector('.language-dropdown');
        const currentLanguageFlag = languageBtn.querySelector('#currentLanguageFlag');
        const currentLanguageCode = languageBtn.querySelector('#currentLanguageCode');
        const languageOptions = languageBtn.querySelectorAll('.language-option');

        // Toggle dropdown
        languageBtn.querySelector('.language-btn').addEventListener('click', () => {
            languageDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageBtn.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });

        // Language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                const flagSrc = option.querySelector('img').src;
                const languageName = option.querySelector('span').textContent;

                // Update current language display
                currentLanguageFlag.src = flagSrc;
                currentLanguageCode.textContent = lang.toUpperCase();

                // Set language in localStorage
                localStorage.setItem('language', lang);

                // Close dropdown
                languageDropdown.classList.remove('show');

                // Update active state of language buttons
                updateButtonStates();

                // Update text content based on translations
                updateLanguage();
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

    // Initialize language on page load
    const savedLanguage = localStorage.getItem('language') || 'en';
    const initialOption = document.querySelector(`.language-option[data-lang="${savedLanguage}"]`);
    if (initialOption) {
        initialOption.click();
    }
});
