// Courses page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Auto-scroll animation
    let currentSection = 0;
    const sections = document.querySelectorAll('.course-category');
    const scrollDuration = 1000; // Duration in milliseconds
    let isScrolling = false;
    let scrollTimeout;

    // Typewriter effect function
    function typeWriter(element, text, speed = 50) {
        return new Promise(resolve => {
            element.style.opacity = '1';
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            element.textContent = '';
            type();
        });
    }

    // Initial animation for title and subtitle
    const title = document.querySelector('.section-title');
    const subtitle = document.querySelector('.section-subtitle');
    title.style.opacity = '0';
    subtitle.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    subtitle.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        title.style.transition = 'all 0.6s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            subtitle.style.transition = 'all 0.6s ease';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
            
            setTimeout(startAutoScroll, 1000);
        }, 200);
    }, 500);

    async function animateCards(section) {
        const cards = section.querySelectorAll('.course-card');
        for (let card of cards) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';

            // Get the original text content
            const titleElement = card.querySelector('h3');
            const descElement = card.querySelector('p');
            const titleText = titleElement.textContent;
            const descText = descElement.textContent;

            // Animate title
            await typeWriter(titleElement, titleText, 30);
            // Animate description
            await typeWriter(descElement, descText, 15);

            // Animate tags
            const tags = card.querySelectorAll('.course-tags span');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }

    // Initialize cards with starting styles
    document.querySelectorAll('.course-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Initialize tags
        card.querySelectorAll('.course-tags span').forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'all 0.3s ease';
        });
    });

    function startAutoScroll() {
        if (currentSection < sections.length) {
            scrollToSection(currentSection);
            currentSection++;
            setTimeout(startAutoScroll, 4000); // Increased wait time for typewriter effect
        }
    }

    function scrollToSection(index) {
        if (isScrolling) return;
        isScrolling = true;

        const section = sections[index];
        const start = window.pageYOffset;
        const end = section.offsetTop - 100; // Offset for navbar
        const change = end - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / scrollDuration, 1);

            // Easing function for smooth animation
            const easeInOutCubic = progress => {
                return progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            };

            window.scrollTo(0, start + change * easeInOutCubic(progress));

            if (timeElapsed < scrollDuration) {
                requestAnimationFrame(animation);
            } else {
                isScrolling = false;
                animateCards(section);
            }
        }

        requestAnimationFrame(animation);
    }

    // Enhanced hover animations for course cards
    document.querySelectorAll('.course-card').forEach(card => {
        const icon = card.querySelector('.course-icon i');
        const tags = card.querySelectorAll('.course-tags span');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            tags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });

    // Manual scroll handling
    let lastScrollTime = Date.now();
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        const now = Date.now();
        
        if (now - lastScrollTime > 1000) { // Only trigger if user hasn't scrolled for 1 second
            scrollTimeout = setTimeout(() => {
                const scrollPosition = window.pageYOffset;
                sections.forEach((section, index) => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        animateCards(section);
                    }
                });
            }, 100);
        }
        lastScrollTime = now;
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe all course categories
    document.querySelectorAll('.course-category').forEach(category => {
        observer.observe(category);
    });

    // Animate tags on hover
    document.querySelectorAll('.course-tags span').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});
