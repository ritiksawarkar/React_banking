// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');
const googleSignInBtn = document.getElementById('googleSignIn');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.querySelector('i').classList.toggle('fa-eye');
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
});

// Regular email/password login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
        const email = emailInput.value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        try {
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

            const userCredential = await auth.signInWithEmail(email, password, remember);
            
            // Store minimal user data
            localStorage.setItem('user', JSON.stringify({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL
            }));

            auth.showToast('Login successful!', 'success');
            
            // Redirect to dashboard after successful login
            window.location.href = '../dashboard/dashboard.html';
        } catch (error) {
            auth.showToast(error.message, 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
});

// Google Sign In
googleSignInBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default button behavior
    
    try {
        // Show loading state
        googleSignInBtn.disabled = true;
        const originalContent = googleSignInBtn.innerHTML;
        googleSignInBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

        const result = await auth.signInWithGoogle();
        
        if (result) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }));

            auth.showToast('Google login successful!', 'success');
            
            // Redirect to dashboard after successful login
            window.location.href = '../dashboard/dashboard.html';
        }
    } catch (error) {
        console.error('Google Sign In Error:', error);
        // Error handling is done in auth.js
    } finally {
        // Reset button state
        googleSignInBtn.disabled = false;
        googleSignInBtn.innerHTML = '<i class="fab fa-google"></i> Google';
    }
});

// Initialize login form
function initializeLoginForm() {
    // Form validation
    const validateLoginForm = () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
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

        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    };

    // Show error message
    const showError = (fieldId, message) => {
        const input = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;

        input.classList.add('error');
        input.parentElement.appendChild(errorDiv);
    };

    // Validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLoginForm();
    updateCurrentDate();
    
    // Check if user is already logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to dashboard
            window.location.href = '../dashboard/dashboard.html';
        }
    });

    // Cleanup auth state observer when page is unloaded
    window.addEventListener('unload', () => {
        unsubscribe();
    });
}); 