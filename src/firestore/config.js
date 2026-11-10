import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVeB7ilUA7OtnbXDiw2xRniUSmCa_juSY",
  authDomain: "curso-react-2026-250a2.firebaseapp.com",
  projectId: "curso-react-2026-250a2",
  storageBucket: "curso-react-2026-250a2.firebasestorage.app",
  messagingSenderId: "79848596155",
  appId: "1:79848596155:web:31483e46b5e209281f3f9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);