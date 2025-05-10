// src/services/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB988kPz8PZV2E1tFZ5nO0XBOy99zOoS9g",
  authDomain: "swaadley.firebaseapp.com",
  projectId: "swaadley",
  storageBucket: "swaadley.firebasestorage.app",
  messagingSenderId: "790837379583",
  appId: "1:790837379583:web:db50dbdf34572eaa0527ca",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
