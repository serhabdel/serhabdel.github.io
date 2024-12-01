document.addEventListener('DOMContentLoaded', () => {
    // Animate experience items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        observer.observe(item);
    });

    // Add hover animations for highlight items
    document.querySelectorAll('.highlight-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('i').style.transform = 'scale(1.2) rotate(10deg)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('i').style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
