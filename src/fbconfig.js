// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkIV7PmG9pU4E0zbD6b0HxQg6hhFoX3xU",
  authDomain: "map-app-1-45664.firebaseapp.com",
  databaseURL: "https://map-app-1-45664-default-rtdb.firebaseio.com",
  projectId: "map-app-1-45664",
  storageBucket: "map-app-1-45664.appspot.com",
  messagingSenderId: "395342364717",
  appId: "1:395342364717:web:4d5752f06e575eb6aff8a4"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);