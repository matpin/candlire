// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.SECRET_ARI_KEY}`,
  authDomain: "candlire-uploading-images.firebaseapp.com",
  projectId: "candlire-uploading-images",
  storageBucket: "candlire-uploading-images.appspot.com",
  messagingSenderId: `${process.env.SECRET_MESSAGING_SENDER_ID}`,
  appId: `${process.env.SECRET_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)