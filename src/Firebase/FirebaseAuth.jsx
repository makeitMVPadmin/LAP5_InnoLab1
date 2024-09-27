/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail as sendResetEmail,
} from "firebase/auth";
import { auth } from "./FirebaseConfig"; // Import the Firebase authentication object from FirebaseConfig
import { updateUserInFirestore } from "./FirebaseStore";

// Export a function to handle user sign-up
export const handleSignUp = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Update or create user in Firestore
    await updateUserInFirestore(user, { email, fullName });
  } catch (error) {
    // Handle the error or display an error message to the user.
    console.error("Sign-up error:", error);
  }
};

// Export a function to handle user sign-in
export const handleSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Update user in Firestore on sign-in (if needed)
    await updateUserInFirestore(user, { email });
  } catch (error) {
    // Handle the error or display an error message to the user.
    console.error("Sign-in error:", error);
  }
};

// Export a function to handle Google sign-in
export const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    // Sign in with Google and get user credentials
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    // Extract additional information
    const { email, photoURL, displayName } = user;

    // Update or create user in Firestore with additional information
    await updateUserInFirestore(user, {
      email,
      photoURL,
      fullName: displayName,
    });
  } catch (error) {
    // Handle the error or display an error message to the user.
    console.error("Google sign-in error:", error);
  }
};

//reset user password via email
export const sendPasswordResetEmail = async (email) => {
  try {
    await sendResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};
