import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

export const saveEventToFirestore = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "hackathonEvents"), eventData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
