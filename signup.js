// Import the firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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

    // Get references
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Get a reference to the success message div
    const successMessage = document.getElementById('success-message');

    // Get references to the input fields and sign up button
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signUpButton = document.querySelector('.signup-button');

    // Check if the signUpButton is found before attaching the event listener
    if (signUpButton) {
        // Sign up button click event handler
        signUpButton.addEventListener('click', () => {
            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            // Create a new user with email and password
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // User signed up successfully
                    const user = {
                        username: username,
                        email: email,
                    };

                    // Save user data to Firestore
                    const userDocRef = doc(db, 'users', userCredential.user.uid);
                    setDoc(userDocRef, user)
                        .then(() => {
                            console.log('User data saved successfully.');
                            // Reset form fields and display success message
                            usernameInput.value = '';
                            emailInput.value = '';
                            passwordInput.value = '';
                            console.log('Form fields reset.');

                            // Update the success message content and show it on the website
                            successMessage.textContent = 'Account created successfully!';
                            successMessage.style.display = 'block'; // Make the success message visible
                        })
                        .catch((error) => {
                            console.error('Error saving user data:', error.message);
                            // Handle error while saving user data
                        });
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        // Handle email already in use error
                        console.error('Email address is already in use.');
                    } else {
                        // Handle other errors
                        console.error('Error signing up:', error.message);
                    }
                });
        });
    } else {
        console.error('Sign up button not found.');
    }

    // Auth state change listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User is signed in:', user);
            // Redirect the user to another page or handle the authenticated state
        } else {
            console.log('User is signed out');
        }
    });
});
