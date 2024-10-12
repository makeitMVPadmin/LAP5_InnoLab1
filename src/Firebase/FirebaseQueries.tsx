import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";

type HackathonEventType = {
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

export const fetchHackathonEvents = async (): Promise<{ events: Record<string, HackathonEventType>; loading: boolean; error: string | null }> => {
  let loading = true;
  let error: string | null = null;
  let events: Record<string, HackathonEventType> = {};

  try {
    const colRef = collection(db, "hackathonEvents");
    const querySnapshot = await getDocs(colRef);
    
    events = querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data() as HackathonEventType;
      return acc;
    }, {} as Record<string, HackathonEventType>);
  } catch (err) {
    error = (err as Error).message;
  } finally {
    loading = false;
  }

  return { events, loading, error };
};
type ProjectLinkType = {
  url: string;
}

type TeamMembersType = {
  name: string;
  role: string;
}

type HackathonSubmissionType = {
  designFeatures: string;
  designTools: string;
  eventId: string;
  imageFile: string;
  nextSteps: string;
  problemStatement: string;
  projectLinks: ProjectLinkType[];
  teamMembers: TeamMembersType[];
  teamName: string;
  techStack: string[];
};

export const fetchHackathonSubmissions = async (id: string): Promise<{ submissions: Record<string, HackathonSubmissionType>; loading: boolean; error: string | null }> => {
  let loading = true;
  let error: string | null = null;
  let submissions: Record<string, HackathonSubmissionType> = {};

  try {
      const colRef = collection(db, "hackathonProjectSubmissions");
      const querySnapshot = await getDocs(colRef);
      
      submissions = querySnapshot.docs.reduce((acc, doc) => {
          // Check if the document ID matches the provided id
          if (doc.id === id) {
              acc[doc.id] = doc.data() as HackathonSubmissionType;
          }
          return acc;
      }, {} as Record<string, HackathonSubmissionType>);
  } catch (err) {
      error = (err as Error).message;
  } finally {
      loading = false;
  }

  return { submissions, loading, error };
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


