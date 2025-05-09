import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjLYCAvCGfOSftNLGfR7p3dHG4GH8KaIw",
  authDomain: "pet-adoption-a7daf.firebaseapp.com",
  projectId: "pet-adoption-a7daf",
  storageBucket: "pet-adoption-a7daf.firebasestorage.app",
  messagingSenderId: "182405650810",
  appId: "1:182405650810:web:b9b19710d98abd99e65ec3",
  measurementId: "G-08TJVJLNB9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
