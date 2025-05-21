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

// Authentication state observer
let authStateObserver = null;

// Initialize auth state observer
function initializeAuthStateObserver() {
    if (authStateObserver) return;

    authStateObserver = firebase.auth().onAuthStateChanged((user) => {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.includes('/login/') || currentPath.includes('/register/');
        const isDashboardPage = currentPath.includes('/dashboard/');

        if (user) {
            // User is signed in
            if (isAuthPage) {
                // Redirect to dashboard if on auth pages
                window.location.href = '../dashboard/dashboard.html';
            } else if (isDashboardPage) {
                // Update user info in dashboard
                updateUserInfo(user);
            }
        } else {
            // User is signed out
            if (isDashboardPage) {
                // Redirect to login if on dashboard
                window.location.href = '../login/login.html';
            }
        }
    });
}

// Update user information in the UI
function updateUserInfo(user) {
    const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    };

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userInfo));

    // Update UI elements if they exist
    const userNameElement = document.querySelector('.user-name');
    const userAvatarElement = document.querySelector('.user-avatar');
    const userEmailElement = document.querySelector('.user-email');

    if (userNameElement) {
        userNameElement.textContent = user.displayName || 'User';
    }
    if (userAvatarElement) {
        userAvatarElement.src = user.photoURL || '../../assets/images/default-avatar.png';
    }
    if (userEmailElement) {
        userEmailElement.textContent = user.email;
    }
}

// Sign out function
async function signOut() {
    try {
        // Show loading state
        showToast('Signing out...', 'info');
        
        // Clear any pending operations
        if (authStateObserver) {
            authStateObserver();
            authStateObserver = null;
        }

        // Sign out from Firebase
        await firebase.auth().signOut();
        
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        sessionStorage.clear();
        
        // Clear any cached data
        if (window.caches) {
            try {
                await caches.keys().then(keys => {
                    return Promise.all(keys.map(key => caches.delete(key)));
                });
            } catch (error) {
                console.warn('Cache clearing failed:', error);
            }
        }

        showToast('Successfully signed out', 'success');
        
        // Redirect to login page
        window.location.href = '../login/login.html';
    } catch (error) {
        console.error('Sign out error:', error);
        showToast('Error signing out. Please try again.', 'error');
    }
}

// Google Sign In
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        // Try popup first
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            
            // Store user data
            if (result.user) {
                localStorage.setItem('user', JSON.stringify({
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }));
            }
            
            return result;
        } catch (popupError) {
            // If popup is blocked, try redirect
            if (popupError.code === 'auth/popup-blocked' || 
                popupError.code === 'auth/popup-closed-by-user' ||
                popupError.code === 'auth/cancelled-popup-request') {
                
                // Store the current URL to redirect back after sign-in
                sessionStorage.setItem('redirectUrl', window.location.href);
                
                // Use redirect method instead
                await firebase.auth().signInWithRedirect(provider);
                return null; // Will be handled by getRedirectResult
            }
            throw popupError;
        }
    } catch (error) {
        console.error('Google Sign In Error:', error);
        
        // Handle specific error cases
        switch (error.code) {
            case 'auth/popup-blocked':
                showToast('Please allow popups for this website to sign in with Google', 'warning');
                break;
            case 'auth/popup-closed-by-user':
                showToast('Sign-in was cancelled. Please try again.', 'info');
                break;
            case 'auth/cancelled-popup-request':
                showToast('Sign-in was cancelled. Please try again.', 'info');
                break;
            case 'auth/unauthorized-domain':
                showToast('This domain is not authorized for Google Sign-In. Please contact support.', 'error');
                break;
            default:
                showToast(error.message, 'error');
        }
        throw error;
    }
}

// Handle redirect result
async function handleRedirectResult() {
    try {
        const result = await firebase.auth().getRedirectResult();
        if (result.user) {
            // Store user data
            localStorage.setItem('user', JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }));

            // Get the stored redirect URL
            const redirectUrl = sessionStorage.getItem('redirectUrl');
            if (redirectUrl) {
                sessionStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            } else {
                window.location.href = '../dashboard/dashboard.html';
            }
        }
    } catch (error) {
        console.error('Redirect Result Error:', error);
        showToast(error.message, 'error');
    }
}

// Email/Password Sign In
async function signInWithEmail(email, password, remember = false) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (remember) {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        }
        return userCredential;
    } catch (error) {
        console.error('Email Sign In Error:', error);
        throw error;
    }
}

// Create user with email/password
async function createUserWithEmail(email, password) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return userCredential;
    } catch (error) {
        console.error('Create User Error:', error);
        throw error;
    }
}

// Toast notification function
function showToast(message, type = 'info') {
    const style = {
        background: type === 'success' ? '#4CAF50' : 
                   type === 'error' ? '#f44336' : 
                   type === 'warning' ? '#f59e0b' : '#2196F3'
    };
    
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: style,
        stopOnFocus: true
    }).showToast();
}

// Export functions
window.auth = {
    initializeAuthStateObserver,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    createUserWithEmail,
    showToast,
    handleRedirectResult
}; 