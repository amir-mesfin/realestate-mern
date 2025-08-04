// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-29c5f.firebaseapp.com",
  projectId: "estate-mern-29c5f",
  storageBucket: "estate-mern-29c5f.firebasestorage.app",
  messagingSenderId: "692854583328",
  appId:import.meta.env.VITE_FIREBASE_APP_ID ,
  measurementId: "G-PW2V00LET6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);