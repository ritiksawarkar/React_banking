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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 