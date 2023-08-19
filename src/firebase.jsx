import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgg_n7qiyedkM-E7uFfufd8SFW3LDFjI4",
  authDomain: "todo-list-3b180.firebaseapp.com",
  projectId: "todo-list-3b180",
  storageBucket: "todo-list-3b180.appspot.com",
  messagingSenderId: "688161619982",
  appId: "1:688161619982:web:c71af6ade58cc6502f7c5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export {db}