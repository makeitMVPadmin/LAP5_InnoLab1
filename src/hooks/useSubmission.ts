import { useState, useEffect } from "react";
import { fetchHackathonEvents, fetchHackathonSubmission } from "../Firebase/FirebaseQueries";

const useSubmission = (submissionId: string) => {
    const [submission, setSubmission] = useState(null);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { submission } = await fetchHackathonSubmission(submissionId);
        setSubmission(submission);
        if (submission) {
          const { event } = await fetchHackathonEvents(submission.eventId);
          if (event) {
            setEvent(event);
          }
        } 
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
        if (submissionId.length) {
          fetchData();
        }
      }, [submissionId]);

    return {
      submission,
      event,
      error,
      isLoading
    };
  };

  export default useSubmission;
  
