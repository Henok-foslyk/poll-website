// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA34im9PlaoFTLlzEMD5LEV6UDT_e-S6DU",
  authDomain: "poll-website-29603.firebaseapp.com",
  projectId: "poll-website-29603",
  storageBucket: "poll-website-29603.firebasestorage.app",
  messagingSenderId: "193513783430",
  appId: "1:193513783430:web:ea53bdf4b7f6c2ebc8d107",
  measurementId: "G-T6T2W6LH0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };