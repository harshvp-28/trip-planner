// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3AL8Hl-nQBpRtI1OmnFgvXioidrcUz_U",
  authDomain: "ai-tripplanner-ba9ed.firebaseapp.com",
  projectId: "ai-tripplanner-ba9ed",
  storageBucket: "ai-tripplanner-ba9ed.firebasestorage.app",
  messagingSenderId: "135714383799",
  appId: "1:135714383799:web:6ef7bf9554a429ddeaea32",
  measurementId: "G-4S78EQJGKL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);