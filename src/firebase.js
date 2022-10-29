// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA32ndIJsDMJcUvLLZR7gv3t8rInlS6y_4',
	authDomain: 'humiba-instagram-clone.firebaseapp.com',
	projectId: 'humiba-instagram-clone',
	storageBucket: 'humiba-instagram-clone.appspot.com',
	messagingSenderId: '323953819472',
	appId: '1:323953819472:web:78b98af41a87fbe90d7655',
	measurementId: 'G-LVC67WNRGH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };