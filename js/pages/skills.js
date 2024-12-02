// Skills page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initializeAOS();
    initializeSkillBars();
    initializeOverviewItems();
    initializeLanguageSkills();
});

function initializeAOS() {
    // Initialize Animate on Scroll
    const skillItems = document.querySelectorAll('.skill-item, .software-item, .language-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Animate skill bars when visible
                const skillBar = entry.target.querySelector('.skill-progress');
                if (skillBar) {
                    const width = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, {
        threshold: 0.2
    });

    skillItems.forEach(item => {
        item.setAttribute('data-aos', 'fade-up');
        observer.observe(item);
    });
}

function initializeSkillBars() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.dataset.progress || '0%';
                }
            }
        });
    }, {
        threshold: 0.2
    });

    skillBars.forEach(bar => observer.observe(bar));
}

function initializeOverviewItems() {
    // Add click handlers for overview items
    const overviewItems = document.querySelectorAll('.overview-item');
    
    overviewItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Add highlight animation
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1500);
            }
        });

        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

function initializeLanguageSkills() {
    // Animate language skill tags
    const languageItems = document.querySelectorAll('.language-item');
    
    languageItems.forEach(item => {
        const skillTags = item.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    });
}

// Theme switcher functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    if (themeToggle) {
        themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Handle scroll animations
window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const delay = index * 0.1;
        const startPoint = (index / skillItems.length) - 0.2;
        const endPoint = startPoint + 0.4;
        
        let progress = (scrollProgress - startPoint) / (endPoint - startPoint);
        progress = Math.max(0, Math.min(1, progress));
        
        item.style.opacity = progress;
        item.style.transform = `translateY(${20 - (progress * 20)}px)`;
    });
});
