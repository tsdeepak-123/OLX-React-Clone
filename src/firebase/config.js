import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCPQnay2XNRGXjWxS9nIE-PPAnJi913eT8",
    authDomain: "sample-8a0f4.firebaseapp.com",
    projectId: "sample-8a0f4",
    storageBucket: "sample-8a0f4.appspot.com",
    messagingSenderId: "346688275945",
    appId: "1:346688275945:web:b5bfbc27d15c6dc83ab778",
    measurementId: "G-NJQBKRCZGT"
  };

const firebaseApp = initializeApp(firebaseConfig);
// const firebase = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage=getStorage(firebaseApp)

export {firebaseApp,firestore,storage};