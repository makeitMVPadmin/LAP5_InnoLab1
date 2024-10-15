import { useState, useEffect } from "react";
import { fetchHackathonEvents, fetchHackathonSubmissions } from "../Firebase/FirebaseQueries";

const useSubmission = (submissionId: string) => {
    const [submission, setSubmission] = useState(null);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { submissions } = await fetchHackathonSubmissions(submissionId);
        setSubmission(submissions[submissionId]);
        if (submissions) {
          const { event } = await fetchHackathonEvents(submissions[submissionId].eventId);
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
  
