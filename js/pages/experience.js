document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initializeAnimations();
    
    // Initialize stat counters
    initializeStatCounters();
    
    // Initialize skill tag animations
    initializeSkillTags();
});

function initializeAnimations() {
    // Animate experience items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skills tags sequentially
                if (entry.target.classList.contains('experience-item')) {
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        observer.observe(item);
        
        // Initially hide skill tags
        item.querySelectorAll('.skill-tag').forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.3s ease';
        });
    });

    // Add hover animations for highlight items
    document.querySelectorAll('.highlight-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function initializeStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30; // Divide animation into 30 steps
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 30;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

function initializeSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
}
