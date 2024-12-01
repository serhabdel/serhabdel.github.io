// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
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
