// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAkQmG2fTOKbtoo8o4TcDwRsE9eWWY5ng",
  authDomain: "webacarros.firebaseapp.com",
  projectId: "webacarros",
  storageBucket: "webacarros.appspot.com",
  messagingSenderId: "463137445518",
  appId: "1:463137445518:web:1da51e98409b8568bddbdf",
  measurementId: "G-HQ1KN4C7P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage}
