// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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

// Get Firestore instance and reference to the 'contactForm' collection
const db = getFirestore(app);
const contactFormCollection = collection(db, "contactForm");

// Function to save messages to Firestore
const saveMessages = async (name, emailid, msgContent) => {
    try {
        // Add a document to the 'contactForm' collection
        await addDoc(contactFormCollection, {
            name: name,
            emailid: emailid,
            msgContent: msgContent,
        });

        console.log('Message saved successfully');
        document.querySelector('.alert').style.display = 'block'; // Display the alert
    } catch (error) {
        console.error("Error saving message:", error);
    }
};


// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Retrieve form data
    const name = document.getElementById("name").value;
    const emailid = document.getElementById("emailid").value;
    const msgContent = document.getElementById("msgContent").value;

    // Call the function to save messages
    await saveMessages(name, emailid, msgContent);
    
    // Clear the form fields
    document.getElementById("name").value = '';
    document.getElementById("emailid").value = '';
    document.getElementById("msgContent").value = '';

    console.log('Form submitted successfully');
});