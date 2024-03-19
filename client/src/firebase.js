// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inkwell-47070.firebaseapp.com",
  projectId: "inkwell-47070",
  storageBucket: "inkwell-47070.appspot.com",
  messagingSenderId: "405505629587",
  appId: "1:405505629587:web:c506a8bfbc97cef5859c66",
  measurementId: "G-VL38T6PGKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
