// Intersection Observer for animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach((element) => {
        observer.observe(element);
        // Set initial state
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
};

// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Skills data
const skills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'Python', level: 65 }
];

// Populate skills
const skillsGrid = document.querySelector('.skills-grid');
skills.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.classList.add('skill');
    skillElement.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="skill-bar">
            <div class="skill-level" style="width: ${skill.level}%"></div>
        </div>
    `;
    skillsGrid.appendChild(skillElement);
});

// Form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Scroll animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 2)) {
            section.classList.add('active');
        }
    });
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Skills hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseover', () => {
        skill.style.transform = 'scale(1.05)';
    });
    
    skill.addEventListener('mouseout', () => {
        skill.style.transform = 'scale(1)';
    });
});

// Language switching functionality
let currentLang = localStorage.getItem('preferred-language') || 'en';

const translations = {
    en: {
        nav: {
            about: "About",
            experience: "Experience",
            skills: "Skills",
            projects: "Projects",
            courses: "Courses",
            certifications: "Certifications",
            contact: "Contact"
        },
        about: {
            title: "About Me",
            description: "Finance and Management Control student at Université Chouaib Doukkali El Jadida, passionate about data analysis and process optimization."
        },
        hero: {
            title: "Hi, I'm Abdelhalim Serhani",
            subtitle: "Future Auditor / Management Controller",
            description: "Looking for an EOS Internship",
            bio: "A very passionate, curious and serious young man about everything related to the world of finance and management, also about work automation, I wish to find an opportunity to strengthen my professional and personal skills."
        }
    },
    fr: {
        nav: {
            about: "À Propos",
            experience: "Expérience",
            skills: "Compétences",
            projects: "Projets",
            courses: "Cours",
            certifications: "Certifications",
            contact: "Contact"
        },
        about: {
            title: "À Propos de Moi",
            description: "Étudiant en Finance et Contrôle de Gestion à l'Université Chouaib Doukkali El Jadida, passionné par l'analyse de données et l'optimisation des processus."
        },
        hero: {
            title: "Bonjour, Je suis Abdelhalim Serhani",
            subtitle: "Futur Auditeur / Contrôleur de Gestion",
            description: "À la recherche d'un Stage de Fin d'Études",
            bio: "Un jeune homme très passionné, curieux et sérieux par tout ce qui touche au monde de la finance et de la gestion, également par l'automatisation du travail, je souhaite trouver une opportunité pour renforcer mes compétences professionnelles et personnelles."
        }
    }
};

// Function to update text content based on data-i18n attribute
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations[currentLang];
        
        // Navigate through nested objects
        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                console.warn(`Translation missing for: ${keys.join('.')} in ${currentLang}`);
                return;
            }
        }

        // Update content based on element type
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = value;
        } else {
            element.textContent = value;
        }
    });

    // Update language button text
    document.querySelector('.lang-text').textContent = currentLang.toUpperCase();
}

// Function to toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    localStorage.setItem('preferred-language', currentLang);
    document.documentElement.setAttribute('data-lang', currentLang);
    updateContent();
    console.log('Language switched to:', currentLang); // Debug log
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = savedLang || (browserLang.startsWith('fr') ? 'fr' : 'en');
    
    // Set language attributes
    document.documentElement.setAttribute('data-lang', currentLang);
    document.querySelector('.lang-text').textContent = currentLang.toUpperCase();
    
    // Initial content update
    updateContent();
    console.log('Initial language:', currentLang); // Debug log
});
