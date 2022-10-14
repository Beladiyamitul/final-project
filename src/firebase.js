// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv1C2zkb3z0xIitV6eNYtqSz8NSCgoxS0",
  authDomain: "final-project-6995d.firebaseapp.com",
  projectId: "final-project-6995d",
  storageBucket: "final-project-6995d.appspot.com",
  messagingSenderId: "665235476294",
  appId: "1:665235476294:web:e55de19e4a34bca65cdf47",
  measurementId: "G-8BKH1S359R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
