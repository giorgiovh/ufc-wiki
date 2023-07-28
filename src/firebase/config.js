import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaZ5vjneRNEy7xERYbr4lew36jnHNxNZI",
  authDomain: "ufc-wiki-b409b.firebaseapp.com",
  projectId: "ufc-wiki-b409b",
  storageBucket: "ufc-wiki-b409b.appspot.com",
  messagingSenderId: "788504928142",
  appId: "1:788504928142:web:44dfaf3c3e390b0c850edf"
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services:

// auth
const projectAuth = getAuth(app);

// timestamp
const timestamp = Timestamp;

// Google auth provider
const provider = new GoogleAuthProvider();

export { projectAuth, timestamp, provider }