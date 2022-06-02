// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9IhWxO4T3GlKK9HPgSul-Ss9PFhjlMZM",
    authDomain: "auth-example-16d38.firebaseapp.com",
    projectId: "auth-example-16d38",
    storageBucket: "auth-example-16d38.appspot.com",
    messagingSenderId: "949873605122",
    appId: "1:949873605122:web:b468a2e3ea6ea537ad051b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
