/* eslint-disable no-unused-vars */
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail as sendResetEmail,
  UserCredential,
} from "firebase/auth";
import { auth } from "./FirebaseConfig"; // Import the Firebase authentication object from FirebaseConfig
import { updateUserInFirestore } from "./FirebaseStore";

// Export a function to handle user sign-up

export const handleSignUp = async (
  email: string,
  password: string,
  fullName: string
): Promise<void> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    const photoURL = user.photoURL || null;

    // Update or create user in Firestore
    await updateUserInFirestore(user, { email, fullName, photoURL });
  } catch (error) {
    console.error("Sign-up error:", error);
  }
};

// Export a function to handle user sign-in
export const handleSignIn = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    const photoURL = user.photoURL || null;

    // Update user in Firestore on sign-in (if needed)
    await updateUserInFirestore(user, { email, fullName: user.displayName || '', photoURL });
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};

// Export a function to handle Google sign-in
export const handleGoogleSignIn = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    // Sign in with Google and get user credentials
    const result: UserCredential = await signInWithPopup(auth, provider);
    const { user } = result;

    // Extract additional information
    const { email, photoURL, displayName } = user;

    // Update or create user in Firestore with additional information
    await updateUserInFirestore(user, {
      email: email ?? "",
      photoURL: photoURL ?? "",
      fullName: displayName ?? "",
    });
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};

// Reset user password via email
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await sendResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error: any) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};
