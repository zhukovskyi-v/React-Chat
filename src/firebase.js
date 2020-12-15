import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVjDPbBqO3Q8rotr-KIJCXnVCfFJXALxk",
    authDomain: "reenbit-chat.firebaseapp.com",
    databaseURL: "https://reenbit-chat.firebaseio.com",
    projectId: "reenbit-chat",
    storageBucket: "reenbit-chat.appspot.com",
    messagingSenderId: "3192331763",
    appId: "1:3192331763:web:5586b216d7872f7d010686",
    measurementId: "G-KC75PZK7KK"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth, provider};
export default db;