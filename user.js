import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    // Firebase configuration object
    const firebaseConfig = {
        apiKey: "AIzaSyADgRVAWilijxONrmtFcaboSg9apMae_B4",
        authDomain: "assessment2web.firebaseapp.com",
        databaseURL: "https://assessment2web-default-rtdb.firebaseio.com",
        projectId: "assessment2web",
        storageBucket: "assessment2web.appspot.com",
        messagingSenderId: "337632152253",
        appId: "1:337632152253:web:8ee4aec82663844ad105d4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Get references to "Sign Up," "Log In," and "Profile" links in the navigation bar
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');

    // Set initial styles to hide the buttons
    if (signupLink) signupLink.style.display = 'none';
    if (loginLink) loginLink.style.display = 'none';
    if (profileLink) profileLink.style.display = 'none';

    // Auth state change listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, hide "Sign Up," "Log In," and show "Profile" links
            if (signupLink) signupLink.style.display = 'none';
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'block';
        } else {
            // User is signed out, show "Sign Up" and "Log In," hide "Profile" links
            if (signupLink) signupLink.style.display = 'block';
            if (loginLink) loginLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
        }
    });
});

