document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to English
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';

    // More reliable flag images
    const flags = {
        en: 'https://flagcdn.com/w40/us.png',
        fr: 'https://flagcdn.com/w40/fr.png'
    };

    // Function to change language dynamically
    window.changeLanguage = function(lang) {
        // Update localStorage
        localStorage.setItem('selectedLanguage', lang);

        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-i18n]');
        translatableElements.forEach(element => {
            const translationKey = element.getAttribute('data-i18n');
            const keys = translationKey.split('.');
            
            // Navigate through the translation object
            let translation = translations[lang];
            for (let key of keys) {
                translation = translation[key];
            }
            
            // Update text content
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update page title
        const pageTitleKey = translations[lang].pageTitle;
        if (pageTitleKey) {
            document.title = pageTitleKey;
        }
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

                // Update current language display
                currentLanguageFlag.src = flagSrc;
                currentLanguageCode.textContent = lang.toUpperCase();

                // Close dropdown
                languageDropdown.classList.remove('show');

                // Change language without page refresh
                window.changeLanguage(lang);
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
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const initialOption = document.querySelector(`.language-option[data-lang="${savedLanguage}"]`);
    if (initialOption) {
        initialOption.click();
    }
});
