// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3usKbc5TQ8LKA0OlLYmYLerelVM3PBiE",
  authDomain: "challenge-96940.firebaseapp.com",
  projectId: "challenge-96940",
  storageBucket: "challenge-96940.appspot.com",
  messagingSenderId: "841257160659",
  appId: "1:841257160659:web:84ed7bebde20935f502926",
  measurementId: "G-XK80RT7RQC"
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth();

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword};