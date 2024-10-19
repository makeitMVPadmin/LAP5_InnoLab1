import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";

export type HackathonEvent = {
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
  skillLevel: string;
  startTime: string;
  themes: string[];
  timeZone: string;
  title: string;
};

export const fetchHackathonEvents = async (): Promise<{ events: Record<string, HackathonEvent>; loading: boolean; error: string | null }> => {
  let loading = true;
  let error: string | null = null;
  let events: Record<string, HackathonEvent> = {};

  try {
    const colRef = collection(db, "hackathonEvents");
    const querySnapshot = await getDocs(colRef);
    
    events = querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data() as HackathonEvent;
      return acc;
    }, {} as Record<string, HackathonEvent>);
  } catch (err) {
    error = (err as Error).message;
  } finally {
    loading = false;
  }

  return { events, loading, error };
};


export const useJoinedEvents = (userId: string | undefined): { joinedEvents: string[], loading: boolean, error: string | null } => {
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      setLoading(true);
      setError(null);

      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "hackathonUsers", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const userData = userDoc.data();
      const events = userData.joinedEvents || [];
      setJoinedEvents(events as string[]);
      setLoading(false);
    };

    fetchJoinedEvents();
  }, [userId]);

  return { joinedEvents, loading, error };
};
