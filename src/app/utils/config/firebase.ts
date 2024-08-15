// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoq9go8h9nFdfybg3DTJv2n5Fs6XQnFM0",
  authDomain: "chatter-app-2d62d.firebaseapp.com",
  projectId: "chatter-app-2d62d",
  storageBucket: "chatter-app-2d62d.appspot.com",
  messagingSenderId: "1052226602783",
  appId: "1:1052226602783:web:84205fe139da5c852e922a",
  measurementId: "G-7YTMNNJ797",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export { auth, provider, db, storage };
