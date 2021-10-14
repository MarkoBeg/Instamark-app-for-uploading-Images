import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmShBa0KNEAN78xp6xfyw3lQ4vVy5KiK8",
  authDomain: "instamark-me.firebaseapp.com",
  projectId: "instamark-me",
  storageBucket: "instamark-me.appspot.com",
  messagingSenderId: "473715649516",
  appId: "1:473715649516:web:8d3a908a84ad16453beec9",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth };
