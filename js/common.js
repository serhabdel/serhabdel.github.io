// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    };

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    setTheme(savedTheme);

    // Theme toggle click handler
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Mobile navigation toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navRight = document.querySelector('.nav-right');

    menuBtn?.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling
        navRight.classList.toggle('open');
        menuBtn.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navRight && !menuBtn.contains(e.target) && !navRight.contains(e.target)) {
            navRight.classList.remove('open');
            menuBtn.classList.remove('open');
        }
    });

    // Prevent menu from closing when clicking inside nav-right
    navRight?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after navigation
                navRight?.classList.remove('open');
                menuBtn?.classList.remove('open');
            }
        });
    });
});
