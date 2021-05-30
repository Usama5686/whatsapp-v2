import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDLwfGZCf1GoszhghV7-ej1TddOCX775oE",
  authDomain: "whatsapp2p0.firebaseapp.com",
  projectId: "whatsapp2p0",
  storageBucket: "whatsapp2p0.appspot.com",
  messagingSenderId: "1078395220147",
  appId: "1:1078395220147:web:d526ab2fa017baf39040c6",
};

//   👇 FOR SERVER SIDE RENDERING
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
