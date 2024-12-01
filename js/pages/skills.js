// Skills page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all skill items
    const skillItems = document.querySelectorAll('.skill-item, .software-item, .soft-skill-item, .language-item');
    skillItems.forEach(item => item.classList.add('fade-in'));

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skill item with progress bar, animate the width
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all fade-in elements
    skillItems.forEach(item => observer.observe(item));

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        if (percentage) {
            bar.style.width = percentage + '%';
        }
    });
});
