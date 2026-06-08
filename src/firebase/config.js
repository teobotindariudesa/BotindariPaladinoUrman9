import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDP2wY1mENWIf9VSGGIuiMqnnCL3db3ZeY",
  authDomain: "proyectointegrador-20a4f.firebaseapp.com",
  projectId: "proyectointegrador-20a4f",
  storageBucket: "proyectointegrador-20a4f.firebasestorage.app",
  messagingSenderId: "501276558831",
  appId: "1:501276558831:web:0f1a4805a4bb913540a21a"
};

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
