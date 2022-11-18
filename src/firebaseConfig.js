import { initializeApp } from "firebase/app";
import { get, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVjWJdnaNCJrYE4hBlJmnbloi8WTjX-uw",
  authDomain: "fir-frontend-71376.firebaseapp.com",
  projectId: "fir-frontend-71376",
  storageBucket: "fir-frontend-71376.appspot.com",
  messagingSenderId: "1074801865777",
  appId: "1:1074801865777:web:1e1fedbca88fd0b27f1110"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
