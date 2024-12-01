// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactMethods = document.querySelectorAll('.contact-method');
    const formStatus = document.getElementById('form-status');

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
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;

        // Update button state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success message
                formStatus.innerHTML = `
                    <div class="alert success">
                        <i class="fas fa-check-circle"></i>
                        Thank you for your message! I'll get back to you soon.
                    </div>
                `;
                contactForm.reset();
                submitBtn.innerHTML = `
                    <span>Message Sent!</span>
                    <i class="fas fa-check"></i>
                `;
                submitBtn.style.backgroundColor = '#4CAF50';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message
            formStatus.innerHTML = `
                <div class="alert error">
                    <i class="fas fa-exclamation-circle"></i>
                    Oops! There was a problem sending your message. Please try again.
                </div>
            `;
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
        }

        // Reset button after 3 seconds
        setTimeout(() => {
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
            if (input.validity.valid) {
                input.classList.remove('error');
            }
        });
    });
});
