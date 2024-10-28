import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchAllEventProjectSubmissions, fetchHackathonEvents, fetchHackathonParticipants } from '../Firebase/FirebaseQueries';
import { formatUserNames } from "../utils/sortHelpers";
import { HackathonSubmissionType } from '../Firebase/FirebaseQueries'; 

// Define types for better type safety
interface EventDataState {
    submissions: HackathonSubmissionType[];
    participantCount: number;
    isLoading: boolean;
    error: string | null;
}

function useEventData(eventId: string) {
    const [state, setState] = useState<EventDataState>({
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
            if (eventResponse?.error || !eventResponse?.event) {
                throw new Error(eventResponse?.error || "Invalid event ID.");
            }

            // Fetch submissions after validating event
            const response = await fetchAllEventProjectSubmissions(eventId);
            const submissions = response?.submissions || [];

            setState(prev => ({
                ...prev,
                submissions,
                participantCount: submissionsResponse?.numberOfParticipants || 0,
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

    const formattedUserNames = useMemo(() =>
        formatUserNames(state.submissions || []),
        [state.submissions]
    );

    const exportData = useMemo(() => {
        return (state.submissions || []).map(submission => ({
            teamName: submission?.teamName || 'Untitled Team',
            projectTitle: submission?.title || 'Untitled Project',
            teamMembers: (submission?.teamMembers || [])
                .map(member => member?.name || 'Anonymous')
                .join(', ') || 'No members'
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