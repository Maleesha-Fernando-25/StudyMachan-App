import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { auth, db } from "./firebaseConfig";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "student" | "tutor"
) {
  // 1. Create account using Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // 2. Get the unique ID Firebase created for the user
  const user = userCredential.user;

  // 3. Save additional user information in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name,
    email: email,
    role: role,
    createdAt: serverTimestamp(),
  });

  return user;
}


export async function loginUser(
  email: string,
  password: string
) {
  // 1. Check email and password with Firebase Authentication
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 2. Find this user's Study Machan profile in Firestore
  const userDocument = await getDoc(
    doc(db, "users", user.uid)
  );

  if (!userDocument.exists()) {
    throw new Error("User profile not found.");
  }

  // 3. Get their profile information
  const profile = userDocument.data();

  return {
    user,
    profile,
  };
}
