import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Study Machan Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2KLzYLgw1BysPU5w6V4SHj67HlCy51Zg",
  authDomain: "studymachan-884e3.firebaseapp.com",
  projectId: "studymachan-884e3",
  storageBucket: "studymachan-884e3.firebasestorage.app",
  messagingSenderId: "180626906475",
  appId: "1:180626906475:web:028a0ee94c27330200802e",
};

// Connect Study Machan to Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore database
const db = getFirestore(app);

export { app, auth, db };

