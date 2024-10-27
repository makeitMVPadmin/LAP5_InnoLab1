import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchAllEventProjectSubmissions, fetchHackathonEvents, fetchHackathonParticipants } from '../Firebase/FirebaseQueries';
import { formatUserNames } from "../utils/sortHelpers"

function useEventData(eventId: string) {
    const [state, setState] = useState({
        submissions: [],
        participantCount: 0,
        isLoading: false,
        error: null
    });

    const fetchEventData = useCallback(async () => {
        if (!eventId) return;

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // Fetch event and submissions in parallel
            const [eventResponse, submissionsResponse] = await Promise.all([
                fetchHackathonEvents(eventId),
                fetchHackathonParticipants(eventId)
            ]);

            // Validate event data
            if (eventResponse.error || !eventResponse.event) {
                throw new Error(eventResponse.error || "Invalid event ID.");
            }

            // Fetch submissions after validating event
            const { submissions } = await fetchAllEventProjectSubmissions(eventId);

            setState(prev => ({
                ...prev,
                submissions,
                // participantCount: submissionsResponse.numberOfParticipants,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : "Failed to load event data.",
                isLoading: false
            }));
            console.error("Error fetching event data:", error);
        }
    }, [eventId]);

    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    const formattedUserNames = useMemo(() =>
        formatUserNames(state.submissions),
        [state.submissions]
    );

    const exportData = useMemo(() => {
        return state.submissions.map(submission => ({
            teamName: submission.teamName,
            projectTitle: submission.title,
            teamMembers: submission.teamMembers.map(member => member.name).join(', ')
        }));
    }, [state.submissions]);

    // Export field configurations
    const exportFields = [
        { header: 'Team Name', key: 'teamName' },
        { header: 'Project Title', key: 'projectTitle' },
        { header: 'Team Members', key: 'teamMembers' }
    ];


    useEffect(() => {
        fetchEventData();
    }, [fetchEventData]);

    return {
        ...state,
        formattedUserNames,
        exportData,
        exportFields,
        refreshData: fetchEventData,
    };
}

export default useEventData;