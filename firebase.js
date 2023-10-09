// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBBFO8FUIDGlU3SqoMlmU_r_PDVSKUMrnM",
  authDomain: "citra-initiative.firebaseapp.com",
  databaseURL: "https://citra-initiative-default-rtdb.firebaseio.com",
  projectId: "citra-initiative",
  storageBucket: "citra-initiative.appspot.com",
  messagingSenderId: "348516455063",
  appId: "1:348516455063:web:489607db99582bd46acfd2",
  measurementId: "G-90T4PL0J67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export {auth, db, storage};