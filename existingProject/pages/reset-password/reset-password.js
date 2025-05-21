document.addEventListener('DOMContentLoaded', () => {
    initializeResetPasswordForm();
});

function initializeResetPasswordForm() {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    // Toggle password visibility
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            button.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    });

    // Password strength meter
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength(passwordInput.value);
        validatePasswordRequirements(passwordInput.value);
    });

    // Form submission
    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateResetPasswordForm()) {
            const formData = new FormData(resetPasswordForm);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }

            try {
                // Show loading state
                const submitButton = resetPasswordForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...';

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showSuccessMessage();

            } catch (error) {
                showToast('Failed to reset password. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

function validateResetPasswordForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;

    // Reset previous error states
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-group input').forEach(input => {
        input.classList.remove('error');
    });

    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (!isPasswordValid(password)) {
        showError('password', 'Password does not meet requirements');
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function isPasswordValid(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    return Object.values(requirements).every(Boolean);
}

function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthValue = document.getElementById('strengthValue');
    let strength = 0;
    let color = '#ef4444'; // Red

    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;

    strengthBar.style.width = `${strength}%`;

    if (strength <= 20) {
        strengthValue.textContent = 'Weak';
        color = '#ef4444';
    } else if (strength <= 40) {
        strengthValue.textContent = 'Fair';
        color = '#f59e0b';
    } else if (strength <= 60) {
        strengthValue.textContent = 'Good';
        color = '#3b82f6';
    } else if (strength <= 80) {
        strengthValue.textContent = 'Strong';
        color = '#10b981';
    } else {
        strengthValue.textContent = 'Very Strong';
        color = '#059669';
    }

    strengthBar.style.backgroundColor = color;
}

function validatePasswordRequirements(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.entries(requirements).forEach(([key, value]) => {
        const requirement = document.getElementById(key);
        const icon = requirement.querySelector('i');
        
        if (value) {
            requirement.classList.add('valid');
            icon.className = 'fas fa-check';
        } else {
            requirement.classList.remove('valid');
            icon.className = 'fas fa-times';
        }
    });
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
    document.getElementById('resetPasswordForm').parentElement.style.display = 'none';
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Add fade-in animation
    successMessage.style.animation = 'fadeIn 0.5s ease forwards';
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