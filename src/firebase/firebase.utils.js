import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxBopFd46iEkJ-lHi0-6m3UcQN3_bZ4Lo",
  authDomain: "b4d1d34-forum-project.firebaseapp.com",
  projectId: "b4d1d34-forum-project",
  storageBucket: "b4d1d34-forum-project.appspot.com",
  messagingSenderId: "881354487994",
  appId: "1:881354487994:web:5eadc9dc3574f37e28aa83",
  measurementId: "G-9YPQTSD987",
};

const userObject = (userAuth, additionalData, snapShotData) => {
  const { displayName, providerData } = userAuth;
  const { providerId } = providerData[0];
  const authMethod = providerId === "google.com" ? "google" : "email/password";
  const createdAt = new Date();
  console.log(snapShotData);
  return {
    displayName: snapShotData?.displayName
      ? snapShotData.displayName
      : displayName,
    createdAt,
    authMethod,
    notifications: snapShotData?.notifications || {},
    rates: snapShotData?.rates || {},
    ...additionalData,
  };
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  const isSnapshotExist = snapShot.exists();

  const compareStoredAndActualObj = (isSnapshotExist) => {
    if (isSnapshotExist) {
      const dbObjectLength = Object.keys(snapShot.data()).length;
      const genObjectLength = Object.keys(
        userObject(userAuth, additionalData)
      ).length;
      return dbObjectLength !== genObjectLength;
    }
  };

  if (!isSnapshotExist || compareStoredAndActualObj(isSnapshotExist)) {
    try {
      if (isSnapshotExist) {
        await setDoc(
          userRef,
          userObject(userAuth, additionalData, snapShot.data())
        );
      } else {
        await setDoc(userRef, userObject(userAuth, additionalData));
      }
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

export const changeDbUserField = async (userId, field, partly) => {
  const userRef = doc(firestore, `users/${userId}`);
  const fieldName = Object.keys(field)[0];

  if (partly) {
    const userSnap = await getDoc(userRef);
    updateDoc(userRef, fieldName, {
      ...userSnap.data()[fieldName],
      [field.id]: field[fieldName],
    });
  } else {
    updateDoc(userRef, fieldName, field[fieldName]);
  }
};

export const updateUserRates = (posts, currentUser) => {
  const allComments = Object.keys(posts).reduce(
    (acc, key) => ({
      ...acc,
      ...posts[key].comments,
    }),
    []
  );
  const allRecords = Object.keys(posts).concat(Object.keys(allComments));
  const filteredRecords = Object.keys(currentUser.rates)
    .filter((key) => allRecords.includes(key) && currentUser.rates[key])
    .reduce(
      (acc, key) => (acc = { ...acc, [key]: currentUser.rates[key] }),
      {}
    );
  changeDbUserField(currentUser.id, { rates: filteredRecords });
};

export const changeDbPostField = (postId, field) => {
  const postRef = doc(firestore, `posts/${postId}`);
  const fieldName = Object.keys(field)[0];
  updateDoc(postRef, fieldName, field[fieldName]);
};

export const changeDbCommentField = async (postId, commentId, field) => {
  const commentRef = doc(firestore, `posts/${postId}/comments/${commentId}`);
  const fieldName = Object.keys(field)[0];
  await updateDoc(commentRef, fieldName, field[fieldName]);
  const commentSnapshot = await getDoc(commentRef);
  return { id: commentSnapshot.id, data: { ...commentSnapshot.data() } };
};

export const getDbPosts = async () => {
  const postsRef = collection(firestore, `posts`);
  const postsSnapshot = await getDocs(postsRef);
  let posts = {};
  for (const doc of postsSnapshot.docs) {
    const commentsRef = collection(firestore, `posts/${doc.id}/comments`);
    const commentsSnapshot = await getDocs(commentsRef);
    let comments = {};
    for (const comment of commentsSnapshot.docs) {
      comments = { ...comments, [comment.id]: { ...comment.data() } };
    }
    posts = { ...posts, [doc.id]: { comments, ...doc.data() } };
  }
  return posts;
};

export const getAuthorName = async (author) => {
  const authorRef = doc(firestore, `users/${author}`);
  const authorSnapshot = await getDoc(authorRef);
  const { displayName } = authorSnapshot.data();
  return displayName;
};

export const createNewPost = async ({
  theme,
  content,
  author,
  closeComments,
}) => {
  const postsRef = collection(firestore, `posts`);
  const createdAt = new Date();
  const comments = {};
  const docRef = await addDoc(postsRef, {
    theme,
    content,
    author,
    closeComments,
    createdAt,
    rating: 0,
  });
  const docSnapshot = await getDoc(docRef);

  return { id: docSnapshot.id, data: { ...docSnapshot.data(), comments } };
};

export const createNewComment = async ({
  content,
  author,
  replyReference,
  postId,
}) => {
  const commentsRef = collection(firestore, `posts/${postId}/comments`);
  const createdAt = new Date();
  const commentRef = await addDoc(commentsRef, {
    content,
    author,
    replyReference,
    createdAt,
    rating: 0,
  });
  const commentSnapshot = await getDoc(commentRef);

  return { id: commentSnapshot.id, data: { ...commentSnapshot.data() } };
};

export const deletePost = async (postId) => {
  const docRef = doc(firestore, `posts/${postId}`);
  return await deleteDoc(docRef);
};

export const deleteComment = async (postId, commentId) => {
  const commentRef = doc(firestore, `posts/${postId}/comments/${commentId}`);
  return await deleteDoc(commentRef);
};

export const updatePost = async (postId, { content, theme }) => {
  const docRef = doc(firestore, `posts/${postId}`);
  await updateDoc(docRef, { content: content, theme: theme });
  const commentsRef = collection(firestore, `posts/${postId}/comments`);
  const commentsSnapshot = await getDocs(commentsRef);
  let comments = {};
  for (const comment of commentsSnapshot.docs) {
    comments = { ...comments, [comment.id]: { ...comment.data() } };
  }
  const docSnapshot = await getDoc(docRef);
  return {
    id: docSnapshot.id,
    data: { ...docSnapshot.data(), comments: { ...comments } },
  };
};
