// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5pZYuN-I-ENvuvjkS19Xk549dpDYOVVk",
  authDomain: "authenticator-82a04.firebaseapp.com",
  projectId: "authenticator-82a04",
  storageBucket: "authenticator-82a04.firebasestorage.app",
  messagingSenderId: "586144867762",
  appId: "1:586144867762:web:beffb68d017c265dc6b0ab"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app); 
export default app;