// Import the firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, addDoc, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Your web app's firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Get references to elements
const commentsList = document.getElementById('comments-list');
const commentText = document.getElementById('comment-text');
const addCommentForm = document.getElementById('add-comment-form');

// Function to display comments
function displayComments(comments) {
  // Sort comments based on timestamp in descending order (newest first)
  comments.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

  commentsList.innerHTML = '';
  
  comments.forEach((comment) => {
      const commentContainer = document.createElement('div');
      commentContainer.className = 'comment';

      const details = document.createElement('div');
      details.className = 'comment-details';
      details.textContent = `${comment.username} (${comment.timestamp.toDate()})`;

      const mainComment = document.createElement('div');
      mainComment.className = 'main-comment';
      mainComment.textContent = comment.text;

      commentContainer.appendChild(details);
      commentContainer.appendChild(mainComment);

      commentsList.appendChild(commentContainer);
  });
}

  
// Event listener for form submission
addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const user = auth.currentUser;
  
    if (user) {
      const comment = commentText.value;
      const timestamp = new Date();
  
      try {
        // Add comment to Firestore
        const docRef = await addDoc(collection(db, 'comments'), {
          username: user.email,
          text: comment,
          timestamp: timestamp,
        });
  
        // Clear the input field
        commentText.value = '';
        console.log('Comment added with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding comment: ', error);
      }
    } else {
      // User is not logged in
      console.log('User is not logged in.');
    }
  });

// Real-time listener for comments
onSnapshot(collection(db, 'comments'), (snapshot) => {
  const comments = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    comments.push({
      username: data.username,
      text: data.text,
      timestamp: data.timestamp,
    });
  });
  displayComments(comments);
});
