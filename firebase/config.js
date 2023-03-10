import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_2-czrCs9bpBv3S3Edfcgjq9cRN_K5z0",
  authDomain: "react-native-app-d6b58.firebaseapp.com",
  databaseURL:
    "https://react-native-app-d6b58-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-app-d6b58",
  storageBucket: "react-native-app-d6b58.appspot.com",
  messagingSenderId: "1051311896267",
  appId: "1:1051311896267:web:7e0b7e3be5f9ac2d084d4e",
  measurementId: "G-P5Q4L4DNB5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
