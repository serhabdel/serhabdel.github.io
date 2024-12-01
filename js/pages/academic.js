document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Add hover animations for timeline dots
    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.2) rotate(360deg)';
        });
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
