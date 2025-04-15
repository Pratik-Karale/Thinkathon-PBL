// Import Firebase modules using CDN (Firebase Modular v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu2AnUJUzb3-CXRbLcAY3GJublg4fph-w",
  authDomain: "pbldbkahoot.firebaseapp.com",
  databaseURL: "https://pbldbkahoot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pbldbkahoot",
  storageBucket: "pbldbkahoot.appspot.com",
  messagingSenderId: "30163259605",
  appId: "1:30163259605:web:aea8ad936f8574886a525c",
  measurementId: "G-F38FGRQKH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Submit score to leaderboard
export function submitScoreToLeaderboard(gameId, score) {
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not logged in!");
    return Promise.reject(new Error("User must be logged in to submit score"));
  }

  const userId = user.uid;

  // games/{gameId}/leaderboard/{userId}
  const leaderboardRef = ref(db, `games/${gameId}/leaderboard/${userId}`);

  return set(leaderboardRef, score)
    .then(() => {
      console.log("Score submitted successfully!");
    })
    .catch((error) => {
      console.error("Error updating leaderboard:", error);
      throw error;
    });
}
