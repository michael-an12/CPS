// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvRqmiTWAI_cD_UvU-7u5v4HeFAuxAqbo",
  authDomain: "car-parking-system-243ba.firebaseapp.com",
  databaseURL: "https://car-parking-system-243ba-default-rtdb.firebaseio.com",
  projectId: "car-parking-system-243ba",
  storageBucket: "car-parking-system-243ba.appspot.com",
  messagingSenderId: "172874780502",
  appId: "1:172874780502:web:2dff77c6638461739350f7",
  measurementId: "G-WJNWB3E2K7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
