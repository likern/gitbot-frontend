import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxA8YVhxydonZLCIuHqXcz3kqRsamzXEo",
  authDomain: "helvy-frontend.firebaseapp.com",
  databaseURL: "https://helvy-frontend.firebaseio.com",
  projectId: "helvy-frontend",
  storageBucket: "helvy-frontend.appspot.com",
  messagingSenderId: "963039152614",
  appId: "1:963039152614:web:352f7d5a6805d24f"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
