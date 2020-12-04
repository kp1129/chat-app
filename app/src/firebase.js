import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAmlKBbjR2PMX7YrZbApD7Lh0DFMEo0lp8",
    authDomain: "chat-app-b93f9.firebaseapp.com",
    projectId: "chat-app-b93f9",
    storageBucket: "chat-app-b93f9.appspot.com",
    messagingSenderId: "247014861806",
    appId: "1:247014861806:web:d9c17d729296e5099ebcff"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
// setup for google sign in
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;