// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactMethods = document.querySelectorAll('.contact-method');

    // Animate contact methods on page load
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            method.style.transition = 'all 0.6s ease';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, index * 200);
    });

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <i class="fas fa-check"></i>
        `;
        submitBtn.style.backgroundColor = '#4CAF50';
        submitBtn.disabled = true;

        // Reset form and button after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    });
});
