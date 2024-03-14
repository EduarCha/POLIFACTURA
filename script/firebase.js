
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0S4WNfUKbm00lCqCYwCSche_sAD_hOd0",
  authDomain: "dbparreno-6451a.firebaseapp.com",
  databaseURL: "https://dbparreno-6451a-default-rtdb.firebaseio.com",
  projectId: "dbparreno-6451a",
  storageBucket: "dbparreno-6451a.appspot.com",
  messagingSenderId: "234414100414",
  appId: "1:234414100414:web:1c839be08c7befc781b3ef",
  measurementId: "G-0LDBWZE0QY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
