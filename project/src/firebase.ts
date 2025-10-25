
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqCf0kLdzJvzyp9O_oSR4tEpBoKWBtbV4",
  authDomain: "farmconnect-1a8df.firebaseapp.com",
  projectId: "farmconnect-1a8df",
  storageBucket: "farmconnect-1a8df.firebasestorage.app",
  messagingSenderId: "372324650099",
  appId: "1:372324650099:web:6c861a543374994c5b6e06",
  measurementId: "G-R46CYQXKMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
