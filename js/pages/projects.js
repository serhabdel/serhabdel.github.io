// Projects page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Animate project items on scroll
    const projectItems = document.querySelectorAll('.project-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Initialize project items animation
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Add hover effect to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.background = 'var(--accent-secondary)';
            tag.style.color = 'var(--bg-primary)';
        });

        tag.addEventListener('mouseout', () => {
            tag.style.background = 'var(--bg-secondary)';
            tag.style.color = 'var(--accent-secondary)';
        });
    });
});
