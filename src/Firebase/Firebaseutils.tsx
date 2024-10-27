import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

export const saveEventToFirestore = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, 'hackathonEvents'), eventData);
    return docRef;
  } catch (error) {
    console.error("Error saving event data:", error);
    throw error;
  }
};
