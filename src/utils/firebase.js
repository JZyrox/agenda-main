import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAz2QPmdTiWkyPW-fEdPWARkOQ955UVQ_U",
  
    authDomain: "agenda-c8d4f.firebaseapp.com",
  
    projectId: "agenda-c8d4f",
  
    storageBucket: "agenda-c8d4f.appspot.com",
  
    messagingSenderId: "865097202921",
  
    appId: "1:865097202921:web:38b0b98ef4b4ee50044478",
  
    measurementId: "G-Z5N60VHF48"
  
  };
  
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export default firebase.initializeApp(firebaseConfig);