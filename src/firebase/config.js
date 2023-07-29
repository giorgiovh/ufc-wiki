import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDaZ5vjneRNEy7xERYbr4lew36jnHNxNZI",
  authDomain: "ufc-wiki-b409b.firebaseapp.com",
  projectId: "ufc-wiki-b409b",
  storageBucket: "ufc-wiki-b409b.appspot.com",
  messagingSenderId: "788504928142",
  appId: "1:788504928142:web:44dfaf3c3e390b0c850edf"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

// Google auth provider
const provider = new firebase.auth.GoogleAuthProvider()

export { projectAuth, timestamp, provider }