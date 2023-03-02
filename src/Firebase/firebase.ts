// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaP1gf_mh2pJSd5sfG3pLhpZtb6m1EJj4",
    authDomain: "adamsandlermovies-3890e.firebaseapp.com",
    databaseURL: "https://adamsandlermovies-3890e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adamsandlermovies-3890e",
    storageBucket: "adamsandlermovies-3890e.appspot.com",
    messagingSenderId: "284492841505",
    appId: "1:284492841505:web:46ed86f57f90c71331d960",
    measurementId: "G-4F6ZTDXYR7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

