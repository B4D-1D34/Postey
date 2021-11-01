import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
// import "firebase/firestore";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxBopFd46iEkJ-lHi0-6m3UcQN3_bZ4Lo",
  authDomain: "b4d1d34-forum-project.firebaseapp.com",
  projectId: "b4d1d34-forum-project",
  storageBucket: "b4d1d34-forum-project.appspot.com",
  messagingSenderId: "881354487994",
  appId: "1:881354487994:web:5eadc9dc3574f37e28aa83",
  measurementId: "G-9YPQTSD987",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const firebaseSignOut = () => signOut(auth);
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithEmailAndPass = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const createUserWithEmailAndPass = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
