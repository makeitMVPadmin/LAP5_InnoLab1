import { useState, useCallback } from 'react';
import {
    fetchAllEventProjectSubmissions,
    fetchHackathonEvents,
    deleteSubmission
} from '../Firebase/FirebaseQueries';

export const useEventSubmissions = (eventId) => {
    const [allSubmissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllSubmissions = useCallback(async () => {
        if (!eventId) return;

        setIsLoading(true);
        setError(null);

        try {
            const { event, error: eventError } = await fetchHackathonEvents(eventId);

            if (eventError || !event) {
                throw new Error(eventError || "Invalid event ID.");
            }

            const { submissions } = await fetchAllEventProjectSubmissions(eventId);
            setSubmissions(submissions);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to load submissions. Please refresh.");
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    const handleDelete = useCallback(async (submissionId) => {
        try {
            const result = await deleteSubmission(submissionId, eventId);

            if (result.success) {
                setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
            } else {
                throw new Error("Deletion failed");
            }
        } catch (error) {
            console.error("Error deleting submission:", error);
        }
    }, [eventId]);

    return {
        allSubmissions,
        isLoading,
        error,
        fetchAllSubmissions,
        handleDelete
    };
};