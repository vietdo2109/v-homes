// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCylUZne2UiJUQPFwzgfa1lHajoXaLqMUg",
  authDomain: "v-homes-47400.firebaseapp.com",
  projectId: "v-homes-47400",
  storageBucket: "v-homes-47400.firebasestorage.app",
  messagingSenderId: "576122352413",
  appId: "1:576122352413:web:22b7d3bc587c091dfe67f4",
};

// Initialize Firebase
const currentApp = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApp.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApp[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
