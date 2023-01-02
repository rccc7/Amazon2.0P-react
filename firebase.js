import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCz6sO0c9VPA17lkp5Ugiw2H_J_D8xn2FY",
    authDomain: "facebook-clone-f94bd.firebaseapp.com",
    databaseURL: "https://facebook-clone-f94bd.firebaseio.com",
    projectId: "facebook-clone-f94bd",
    storageBucket: "facebook-clone-f94bd.appspot.com",
    messagingSenderId: "171708782841",
    appId: "1:171708782841:web:1169c3586efda40b386a28",
    measurementId: "G-C178W1ZN1S"
};

//Obtain the app: If it already is instantiated then return it otherwise instantiate a new one
const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

export default db;