// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHjCnFjbxyJuAOmW15MUCeVQsJVG2fSk0",
  authDomain: "project-1-4b168.firebaseapp.com",
  projectId: "project-1-4b168",
  storageBucket: "project-1-4b168.appspot.com",
  messagingSenderId: "920124451056",
  appId: "1:920124451056:web:c4e151aaba533b3e007a35"
};


// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();