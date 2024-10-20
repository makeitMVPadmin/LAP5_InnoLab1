import { useState, useEffect, useCallback } from "react";
import { fetchHackathonEvents } from "../Firebase/FirebaseQueries";
import { sortEventsByStartTime } from "../utils/sortEventsFunctions";

const useEvents = (joinedEvents: string[]) => {
    const [events, setEvents] = useState({
        joinedCurrentEvents: [],
        joinedPastEvents: [],
        allCurrentEvents: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { events } = await fetchHackathonEvents();
            const now = new Date();

            const { joinedCurrentEvents, joinedPastEvents, allCurrentEvents } = Object.entries(events).reduce((acc, [id, event]) => {
                const eventEndTime = new Date(event.endTime);
                const eventData = { id, ...event };

                if (joinedEvents.includes(id)) {
                    (eventEndTime > now ? acc.joinedCurrentEvents : acc.joinedPastEvents).push(eventData);
                }
                if (eventEndTime > now) {
                    acc.allCurrentEvents.push(eventData);
                }
                return acc;
            }, { joinedCurrentEvents: [], joinedPastEvents: [], allCurrentEvents: [] });
            if (joinedCurrentEvents.length === 0 && joinedPastEvents.length === 0) {
                setEvents({
                    joinedCurrentEvents: [],
                    joinedPastEvents: [],
                    allCurrentEvents: sortEventsByStartTime(allCurrentEvents), // Sort current events
                });
            } else {
                setEvents({
                    joinedCurrentEvents: sortEventsByStartTime(joinedCurrentEvents),
                    joinedPastEvents: sortEventsByStartTime(joinedPastEvents),
                    allCurrentEvents: sortEventsByStartTime(allCurrentEvents),
                });
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to load events. Try refreshing the page.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [joinedEvents]); // Add joinedEvents as dependency

    const getEndingEvent = useCallback((events: any[]) => {
        if (!events?.length) return null;
        const now = new Date();
        return events.find(event => {
            const endTime = new Date(event.endTime);
            const timeLeft = endTime.getTime() - now.getTime();
            return timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000; // 24 hours
        });
    }, []);
    return {
        events,
        error,
        isLoading,
        getEndingEvent,
        refetchEvents: fetchData,
    };
};


export default useEvents;
