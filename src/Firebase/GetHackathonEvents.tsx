import { getDocs, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";

type HackathonEvent = {
  basicProjectSummary: string;
  createdAt: string;
  disciplines: string[];
  email: string;
  endTime: string;
  firstName: string;
  fullDetails: string[];
  imageUrl: string;
  judges: string[];
  lastName: string;
  meetingLink: string;
  participantCount: number;
  participantIds: string[];
  skillLevel: string;
  startTime: string;
  themes: string[];
  timeZone: string;
  title: string;
}

export const fetchHackathonEvents = async (): Promise<Record<string, HackathonEvent>> => {
  const colRef = collection(db, "hackathonEvents");
  const querySnapshot = await getDocs(colRef);
  
  const events = querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data() as HackathonEvent;
      return acc;
  }, {} as Record<string, HackathonEvent>);

  return events;
};

