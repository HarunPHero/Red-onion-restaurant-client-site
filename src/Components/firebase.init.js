// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyAb-MOfReShflqdul3dZO54gHOI7NwOlAE",
  
    authDomain: "web-red-onion.firebaseapp.com",
  
    projectId: "web-red-onion",
  
    storageBucket: "web-red-onion.appspot.com",
  
    messagingSenderId: "306458863212",
  
    appId: "1:306458863212:web:34a3da8ab0adae048cda49",
  
    measurementId: "G-6JV7M2R5W8"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
