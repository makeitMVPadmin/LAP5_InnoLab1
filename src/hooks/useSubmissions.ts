import { useState, useEffect } from "react";
import { fetchHackathonSubmissions } from "../Firebase/FirebaseQueries";

const useSubmissions = (hackathonId: string) => {
    const [submissions, setSubmissions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { submissions } = await fetchHackathonSubmissions(hackathonId);
        setSubmissions(submissions);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
        if (hackathonId.length) {
          fetchData();
        }
      }, [hackathonId]);

    return {
      submissions,
      error,
      isLoading
    };
  };

  export default useSubmissions;
  
