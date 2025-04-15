// firebaseauth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// ✅ Firebase Init
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu2AnUJUzb3-CXRbLcAY3GJublg4fph-w",
  authDomain: "pbldbkahoot.firebaseapp.com",
  projectId: "pbldbkahoot",
  storageBucket: "pbldbkahoot.firebasestorage.app",
  messagingSenderId: "30163259605",
  appId: "1:30163259605:web:aea8ad936f8574886a525c",
  measurementId: "G-F38FGRQKH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Redirect based on auth state
function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    const path = location.pathname;
    if (user && (path.endsWith("login.html") || path.endsWith("signup.html"))) {
      // setTimeout(() => {
      location.href = "dashboard.html";
      // }, 700);
    } else if (!user && !(path.endsWith("login.html") || path.endsWith("signup.html"))) {
      location.href = "login.html";
    }
  });
}
if(!location.pathname.endsWith("signup.html")){
  checkAuthState();
}

// ✅ Sign Up Handler
function signUp() {
  const username = document.getElementById('new-username')?.value;
  const email = document.getElementById('new-email')?.value;
  const password = document.getElementById('new-password')?.value;

  if (!username || !email || !password) return alert('Please fill in all fields');
  if (password.length < 6) return alert('Password must be at least 6 characters long');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert(`Sign up successful for ${username}`);
      const user = userCredential.user;
      return setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
        gamesCreated: [],
        gamesJoined: [],
        experiencePoints: 230
      })
    })
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert(error.code)
      const msg = {
        "auth/email-already-in-use": "Email already in use. Please log in.",
        "auth/invalid-email": "Invalid email format",
        "auth/weak-password": "Password is too weak"
      }[error.code] || `Sign up failed: ${error.message}`;
      alert(msg);
    });
}

// ✅ Login Handler
function login() {
  const email = document.getElementById('username')?.value;
  const password = document.getElementById('password')?.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Login successful!');
      location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert('Login failed: ' + error.message);
    });
}

// ✅ Forgot Password Handler
function resetPassword() {
  const email = document.getElementById('email')?.value;

  if (!email) return alert('Please enter your email address');

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset link sent to ' + email);
      setTimeout(() => location.href = 'login.html', 2000);
    })
    .catch((error) => {
      const msg = {
        "auth/invalid-email": "Invalid email format",
        "auth/user-not-found": "No account found with this email"
      }[error.code] || `Error: ${error.message}`;
      alert(msg);
    });
}

// ✅ Logout Handler
function logout() {
  signOut(auth)
    .then(() => {
      alert('Logged out successfully');
      location.href = 'login.html';
    })
    .catch((error) => {
      alert('Logout error: ' + error.message);
    });
}

// ✅ Toggle Password Visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input?.nextElementSibling;
  if (!input) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  if (button) button.textContent = isHidden ? 'Hide' : 'Show';
}

// ✅ Setup Event Listeners after DOM load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signup-btn')?.addEventListener('click', signUp);
  document.getElementById('login-btn')?.addEventListener('click', login);
  document.getElementById('reset-btn')?.addEventListener('click', resetPassword);
  document.getElementById('logout-btn')?.addEventListener('click', logout);

  // Handle password toggles
  const toggles = document.querySelectorAll('[data-toggle="password"]');
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-target');
      togglePassword(inputId);
    });
  });
});
