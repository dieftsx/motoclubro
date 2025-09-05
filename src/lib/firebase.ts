// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1eadImsgkgl2q8mFfr5w7xUuvPlyI5pY",
  authDomain: "palpitebox-d3f7d.firebaseapp.com",
  databaseURL: "https://palpitebox-d3f7d-default-rtdb.firebaseio.com",
  projectId: "palpitebox-d3f7d",
  storageBucket: "palpitebox-d3f7d.appspot.com",
  messagingSenderId: "710159241996",
  appId: "1:710159241996:web:798ddf97e065f3ab302f29",
  measurementId: "G-NY5X72CRTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
