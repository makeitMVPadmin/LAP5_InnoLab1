import { getDocs, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export const fetchHackathonEvents = async () => {
  const colRef = collection(db, "hackathonEvents");
  const querySnapshot = await getDocs(colRef);
  return querySnapshot.docs.map((doc) => doc.data());
}
