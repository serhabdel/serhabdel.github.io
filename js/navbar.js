document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from propagating
            menuOpen = !menuOpen;
            
            hamburger.classList.toggle('active', menuOpen);
            navLinks.classList.toggle('active', menuOpen);
            
            // Accessibility improvements
            hamburger.setAttribute('aria-expanded', menuOpen.toString());
            navLinks.setAttribute('aria-hidden', (!menuOpen).toString());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !e.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                menuOpen = false;
                
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                menuOpen = false;
                
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            });
        });
    }
});
