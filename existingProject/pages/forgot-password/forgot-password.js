document.addEventListener('DOMContentLoaded', () => {
    initializeForgotPasswordForm();
});

function initializeForgotPasswordForm() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    // Handle form submission
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForgotPasswordForm()) {
            const formData = new FormData(forgotPasswordForm);
            const email = formData.get('email');

            try {
                // Show loading state
                const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showSuccessMessage();

            } catch (error) {
                showToast('Failed to send reset link. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

function validateForgotPasswordForm() {
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    // Reset previous error states
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-group input').forEach(input => {
        input.classList.remove('error');
    });

    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;

    input.classList.add('error');
    input.parentElement.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showToast(message, type = 'info') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? '#10b981' : 
                        type === 'error' ? '#ef4444' : 
                        type === 'warning' ? '#f59e0b' : '#3b82f6',
    }).showToast();
}

function showSuccessMessage() {
    // Hide the form
    document.getElementById('forgotPasswordForm').parentElement.style.display = 'none';
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Add fade-in animation
    successMessage.style.animation = 'fadeIn 0.5s ease forwards';
}

function resendEmail() {
    const resendButton = document.querySelector('.success-actions .btn-primary');
    const originalText = resendButton.textContent;
    
    // Show loading state
    resendButton.disabled = true;
    resendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate API call
    setTimeout(() => {
        showToast('Reset link has been resent to your email', 'success');
        resendButton.disabled = false;
        resendButton.textContent = originalText;
    }, 1500);
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 