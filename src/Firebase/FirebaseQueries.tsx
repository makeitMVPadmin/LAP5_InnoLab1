import { getDocs, collection, doc, getDoc, setDoc, query, where, runTransaction, arrayRemove } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { convertToUTC, getTimeZoneFromOffset } from "../utils/dateAndTimeFunctions";


export type HackathonEventType = {
  additionalInformation: string;
  basicProjectSummary: string;
  challengeReleaseDate: string;
  challengeReleaseTime: string;
  constraints: string;
  disciplines: string[];
  endDate: string;
  endTime: string;
  evaluationCriteria: string;
  imageUrl: string;
  judges: { firstName: string, lastName: string }[];
  meetingLink: string;
  minParticipants: number;
  maxParticipants: number;
  objectivesGoals: string;
  organizer: string;
  problemStatement: string;
  skillLevel: string;
  startDate: string;
  startTime: string;
  submissionsId?: string[];
  themes: string[];
  timeZone: string;
  title: string;
};


export const fetchHackathonEvents = async (hackathonId?: string): Promise<{ event?: HackathonEventType; events: Record<string, HackathonEventType>; loading: boolean; error: string | null }> => {
  let loading = true;
  let error: string | null = null;
  let event: HackathonEventType | undefined;
  let events: Record<string, HackathonEventType> = {};

  try {
    const colRef = collection(db, "hackathonEvents");
    const querySnapshot = await getDocs(colRef);


    events = querySnapshot.docs.reduce((acc, doc) => {
      const data = doc.data() as HackathonEventType;
      const { startDate, startTime, endDate, endTime, timeZone } = data;

      data.startTime = convertToUTC(startDate, startTime, timeZone ? timeZone.slice(3) : '');
      data.endTime = convertToUTC(endDate, endTime, timeZone ? timeZone.slice(3) : '');
      data.timeZone = timeZone ? getTimeZoneFromOffset(timeZone) : '';


      acc[doc.id] = data;

      return acc;
    }, {} as Record<string, HackathonEventType>);
    if (hackathonId) {
      event = events[hackathonId];
      if (!event) {
        error = "Event not found";
      }
    }
  } catch (err) {
    error = (err as Error).message;
  } finally {
    loading = false;
  }

  return { event, events, loading, error };
};


type JudgeCommentType = {
  comment: string;
  judgeName: string;
  rating: number;
  suggestions: string;
}


export type HackathonSubmissionType = {
  id?: string;
  userId: string;
  title: string;
  designFeatures: string;
  designTools: string;
  eventId: string;
  projectFiles: File[] | null;
  pdfFiles: File[] | null;
  nextSteps: string;
  problemStatement: string;
  projectLinks: { url: string }[];
  teamMembers: { name: string, role: string }[];
  teamName: string;
  techStack: string[];
  createdAt: Timestamp;
  comments?: {commentEntry: string, commentTimestamp: Timestamp, commenterName: string}[];
};

export const fetchHackathonSubmission = async (submissionId: string): Promise<{ submission: HackathonSubmissionType | null; loading: boolean; error: string | null }> => {
    let loading = true;
    let error: string | null = null;
    let submission: HackathonSubmissionType | null = null;

    try {
        const colRef = collection(db, "hackathonProjectSubmissions");
        const querySnapshot = await getDocs(colRef);

        const submissionDoc = querySnapshot.docs.find(doc => doc.id === submissionId);

        if (submissionDoc) {
            submission = submissionDoc.data() as HackathonSubmissionType;
        } else {
            error = "No submission found with the given ID.";
        }
    } catch (err) {
        error = (err as Error).message;
    } finally {
        loading = false;
    }

    return { submission, loading, error };
};


export const fetchAllEventProjectSubmissions = async (id: string) => {
  let loading = true;
  let error: string | null = null;
  let submissions: HackathonSubmissionType[] = [];

  try {
    const colRef = collection(db, "hackathonProjectSubmissions");
    const q = query(colRef);
    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
          if (data.eventId == id) {

          submissions.push({
            id: doc.id,
            ...doc.data(),
          } as HackathonSubmissionType);
        }
        });
    }

  } catch (err) {
    error = (err as Error).message;
  } finally {
    loading = false;
  }

  return { submissions, loading, error };
};

export const deleteSubmission = async (submissionId: string, eventId: string) => {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // Get references to both documents
      const submissionRef = doc(db, "hackathonProjectSubmissions", submissionId);
      const eventRef = doc(db, "hackathonEvents", eventId);

      // Check if submission exists
      const submissionDoc = await transaction.get(submissionRef);
      if (!submissionDoc.exists()) {
        throw new Error(`Submission ${submissionId} does not exist`);
      }

      // Check if event exists
      const eventDoc = await transaction.get(eventRef);
      if (!eventDoc.exists()) {
        throw new Error(`Event ${eventId} does not exist`);
      }

      // Check if submission ID exists in event's submissionIds array
      const eventData = eventDoc.data();
      if (!eventData.submissionsId?.includes(submissionId)) {
        throw new Error(`Submission ${submissionId} not found in event ${eventId}`);
      }

      // Delete the submission document
      await transaction.delete(submissionRef);

      // Remove submission ID from the event's submissionIds array
      await transaction.update(eventRef, {
        submissionsId: arrayRemove(submissionId)
      });

      return true;
    });

    if (!result) {
      throw new Error("Transaction failed");
    }

    return {
      success: true,
      message: `Submission ${submissionId} successfully deleted and event ${eventId} updated`
    };

  } catch (error) {
    console.error("Delete submission error:", error);
    throw error;
  }
};


export const fetchHackathonParticipants = async (eventId: string) => {
  try {
    if (!eventId) {
      throw new Error("Invalid eventId");
    }

    const eventDocRef = doc(db, "hackathonParticipantData", eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (!eventDoc.exists()) {
      await setDoc(eventDocRef, {});
      return {
        userIds: [],
        numberOfParticipants: 0,
        eventData: {}
      };
    }

    const eventData = eventDoc.data();
    const userIds = Object.keys(eventData);
    const numberOfParticipants = userIds.length;

    return { userIds, numberOfParticipants, eventData };
  } catch (err) {
    console.error("Error fetching hackathon participants:", err);
    return null;
  }
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

export const useFetchHackathonUser = (userUid: string | undefined) => {
  const [hackathonUser, setHackathonUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const userDocRef = doc(db, "hackathonUsers", userUid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          setError("User not found");
          setHackathonUser(null);
        } else {
          setHackathonUser(userDoc.data());
        }
      } catch (err) {
        setError("Failed to fetch user");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userUid) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userUid]);

  return { hackathonUser, loading, error };
};