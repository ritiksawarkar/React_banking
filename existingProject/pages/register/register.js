// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo5M76qCRnvfi6SaEyEI-lnpGgMKCsIBQ",
    authDomain: "finverse-banking.firebaseapp.com",
    projectId: "finverse-banking",
    storageBucket: "finverse-banking.firebasestorage.app",
    messagingSenderId: "350814189977",
    appId: "1:350814189977:web:14b30dfe8e386f6de2bb08",
    measurementId: "G-GPHCJF748S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    initializeRegisterForm();
    // Check if user is already logged in
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to dashboard
            window.location.href = '../dashboard/dashboard.html';
        }
    });
});

function initializeRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const googleSignInBtn = document.querySelector('.social-btn.google');
    const appleSignInBtn = document.querySelector('.social-btn.apple');

    // Disable Apple sign-in button
    if (appleSignInBtn) {
        appleSignInBtn.style.opacity = '0.5';
        appleSignInBtn.style.cursor = 'not-allowed';
        appleSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Apple sign-in is currently disabled', 'warning');
        });
    }

    // Google Sign In
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', async () => {
            try {
                // Show loading state
                googleSignInBtn.disabled = true;
                const originalContent = googleSignInBtn.innerHTML;
                googleSignInBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

                const provider = new firebase.auth.GoogleAuthProvider();
                // Add additional scopes if needed
                provider.addScope('profile');
                provider.addScope('email');
                
                const result = await firebase.auth().signInWithPopup(provider);
                
                // Get user data
                const user = result.user;
                const credential = result.credential;
                const token = credential.accessToken;

                showToast('Google registration successful!', 'success');
                
                // Store user data in localStorage if needed
                localStorage.setItem('user', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));

                // Redirect to dashboard after successful registration
                window.location.href = '../dashboard/dashboard.html';
            } catch (error) {
                console.error('Google Sign In Error:', error);
                
                // Handle unauthorized domain error
                if (error.code === 'auth/unauthorized-domain') {
                    showToast('Please add this domain to Firebase authorized domains. For development, add localhost and 127.0.0.1', 'error');
                } else {
                    showToast(error.message, 'error');
                }
            } finally {
                // Reset button state
                googleSignInBtn.disabled = false;
                googleSignInBtn.innerHTML = '<i class="fab fa-google"></i> Google';
            }
        });
    }

    // Toggle password visibility for both password fields
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.querySelector('i').classList.toggle('fa-eye');
            button.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Handle form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateRegisterForm()) {
            const formData = new FormData(registerForm);
            const registerData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password'),
                terms: formData.get('terms') === 'on'
            };

            try {
                // Show loading state
                const submitButton = registerForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Simulate successful registration
                showToast('Account created successfully!', 'success');
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = '../login/login.html';
                }, 1000);

            } catch (error) {
                showToast('Registration failed. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });

    // Social registration handlers
    document.querySelector('.social-btn.google').addEventListener('click', () => {
        showToast('Google registration coming soon!', 'info');
    });

    document.querySelector('.social-btn.apple').addEventListener('click', () => {
        showToast('Apple registration coming soon!', 'info');
    });
}

function validateRegisterForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const terms = document.getElementById('terms').checked;
    let isValid = true;

    // Reset previous error states
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-group input').forEach(input => {
        input.classList.remove('error');
    });

    // Validate first name
    if (!firstName) {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showError('password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
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

    // Validate terms
    if (!terms) {
        showToast('Please agree to the Terms of Service and Privacy Policy', 'warning');
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

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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