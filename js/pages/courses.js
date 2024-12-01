// Courses page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Animate course items on scroll
    const courseItems = document.querySelectorAll('.course-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Initialize course items animation
    courseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Add hover effect to course topics
    const courseTopics = document.querySelectorAll('.course-topics li');
    courseTopics.forEach(topic => {
        topic.addEventListener('mouseover', () => {
            topic.style.color = 'var(--accent-primary)';
        });

        topic.addEventListener('mouseout', () => {
            topic.style.color = 'var(--text-secondary)';
        });
    });
});
