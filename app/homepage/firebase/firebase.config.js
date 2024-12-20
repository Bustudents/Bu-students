// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage,ref} from 'firebase/storage'
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSCWeMeH0njajjBqcvlcHtShkFQwEP5_Q",
  authDomain: "bu-students.firebaseapp.com",
  projectId: "bu-students",
  storageBucket: "bu-students.appspot.com",
  messagingSenderId: "316172061264",
  appId: "1:316172061264:web:f5517c59da6f3c8418df55",
  measurementId: "G-W953WD5ZBH"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const storage=getStorage(app)
const db =getFirestore(app)
export {db,storage,ref,auth}
