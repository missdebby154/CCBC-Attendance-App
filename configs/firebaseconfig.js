// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZbvatxC43xi6i76xal6VCy7kqzA4-K7Q",
  authDomain: "ccbc-attendance-app-84582.firebaseapp.com",
  projectId: "ccbc-attendance-app-84582",
  storageBucket: "ccbc-attendance-app-84582.firebasestorage.app",
  messagingSenderId: "368605233917",
  appId: "1:368605233917:web:ab4d3e1f475b2194473494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
