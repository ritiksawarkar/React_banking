import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider with proper configuration
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account', // This forces the account selection popup
    login_hint: '', // Clear any cached login hint
});

// Add scopes for Google authentication
googleProvider.addScope('profile');
googleProvider.addScope('email');

export { auth, googleProvider }; 