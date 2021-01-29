
import firebase from 'firebase';

// Configuration of Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3mUGEeVTQn7hbmoxUNncowRjwD-5y2TI",
  authDomain: "digital-jalebi-ac363.firebaseapp.com",
  databaseURL: "https://digital-jalebi-ac363-default-rtdb.firebaseio.com",
  projectId: "digital-jalebi-ac363",
  storageBucket: "digital-jalebi-ac363.appspot.com",
  messagingSenderId: "105427663157",
  appId: "1:105427663157:web:3e564360c7852fb4abb47c",
  measurementId: "G-M2DJG8HX1P"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
