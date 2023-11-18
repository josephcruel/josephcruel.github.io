// Import the firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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

    // Firebase configuration object
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Get references to profile details elements
    const profileUsernameElement = document.getElementById('profile-username');
    const profileEmailElement = document.getElementById('profile-email');
    const signOutButton = document.getElementById('sign-out-button');

    // Get references to "Sign Up" and "Log In" links in the navigation bar
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');

    // Auth state change listener
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            // Fetch additional user details from Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                profileUsernameElement.textContent = userData.username || user.email; // Display the username or fallback to email
                profileEmailElement.textContent = user.email; // Display the email
            }

            // Show user info container
            document.querySelector('.user-info').style.display = 'block';

            // Sign out button click event handler
            signOutButton.addEventListener('click', () => {
                signOut(auth)
                    .then(() => {
                        // User signed out successfully
                        console.log('User signed out.');
                        // Redirect to the home page after signing out
                        window.location.href = "index.html";
                    })
                    .catch((error) => {
                        // Handle sign-out errors
                        console.error('Error signing out:', error.message);
                    });
            });
        } else {
            // User is signed out
            document.querySelector('.user-info').style.display = 'none'; // Hide user info container
        }
    });
});



