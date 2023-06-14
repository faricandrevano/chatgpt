// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArNJspopIGVkZuSAHzf-o-v54tAh2AkRw",
  authDomain: "chatbot-399bb.firebaseapp.com",
  projectId: "chatbot-399bb",
  storageBucket: "chatbot-399bb.appspot.com",
  messagingSenderId: "189466475301",
  appId: "1:189466475301:web:173cb24f27bb55fefaf8cc",
  measurementId: "G-B5K1SQQWRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
// const db = getDatabase();
export {auth,provider};
