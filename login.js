// Import the firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Get references to the input fields and login button
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login-button');
const errorMessage = document.getElementById('error-message');

// Login button click event handler
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Attempt to sign in the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            // Reset form fields
            emailInput.value = '';
            passwordInput.value = '';

            // Redirect to the home page after signing in
            window.location.href = "Home.html";
        })
        .catch((error) => {
            // Handle sign-in errors
            console.error('Error signing in:', error.message);
            // Display the error message 
            errorMessage.textContent = 'Email or Password is incorrect!';
            errorMessage.style.display = 'block';
        });
});

// Get references to the user info elements
const userInfoContainer = document.querySelector('.user-info');
const usernameElement = document.getElementById('username');
const signOutButton = document.getElementById('sign-out-button');

// Auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        userInfoContainer.style.display = 'block'; // Show the user info container
        usernameElement.textContent = user.email; // Display the user's email (you can customize this)

        // Sign out button click event handler
        signOutButton.addEventListener('click', () => {
            // Sign out the user
            signOut(auth)
                .then(() => {
                    // User signed out successfully
                    userInfoContainer.style.display = 'none'; // Hide the user info container
                    console.log('User signed out.');
                })
                .catch((error) => {
                    // Handle sign-out errors
                    console.error('Error signing out:', error.message);
                });
        });
    } else {
        // User is signed out
        userInfoContainer.style.display = 'none'; // Hide the user info container
    }
});
