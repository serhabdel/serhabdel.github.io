document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            menuOpen = false;
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('.navbar')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            menuOpen = false;
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
            menuOpen = false;
        });
    });
});
