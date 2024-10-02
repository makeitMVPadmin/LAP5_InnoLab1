import { db } from "./FirebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// Function to create or update user in Firestore
export const updateUserInFirestore = async (
  user,
  { email, photoURL, fullName }
) => {
  try {
    const usersRef = collection(db, "Users");
    const userDocRef = doc(usersRef, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If user document does not exist, create a new one
      await setDoc(userDocRef, {
        email: email || user.email,
        fullName: fullName || user.displayName,
        createdAt: serverTimestamp(),
        profilePhoto: photoURL || "", // You may set this value during signup
      });
    } else {
      // If user document exists, update the existing one
      await setDoc(
        userDocRef,
        {
          email: email || user.email,
          fullName: fullName || user.displayName,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error(
      "Error creating or updating user in Firestore:",
      error.message
    );
    throw error;
  }
};
