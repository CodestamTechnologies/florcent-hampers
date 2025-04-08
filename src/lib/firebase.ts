import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEne3bjT06_vM317GDKGJ-m3lMI3F1e_4",
    authDomain: "florcent-hampers.firebaseapp.com",
    projectId: "florcent-hampers",
    storageBucket: "florcent-hampers.firebasestorage.app",
    messagingSenderId: "642225712253",
    appId: "1:642225712253:web:5c0d42bc52c7e474bd1514",
    measurementId: "G-EJL4E1SETD"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
