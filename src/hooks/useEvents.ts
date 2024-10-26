import { useState, useEffect, useCallback } from "react";
import { fetchHackathonEvents } from "../Firebase/FirebaseQueries";
import { sortEventsByStartTime } from "../utils/sortEventsFunctions";

const useEvents = (joinedEvents: string[], eventId?: string) => {
    const [events, setEvents] = useState({
        joinedCurrentEvents: [],
        joinedPastEvents: [],
        allCurrentEvents: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [singleEvent, setSingleEvent] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { events: fetchedEvents } = await fetchHackathonEvents();
            const now = new Date();
            const { joinedCurrentEvents, joinedPastEvents, allCurrentEvents } = Object.entries(fetchedEvents).reduce((acc, [id, event]) => {
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
            setEvents({
                joinedCurrentEvents: sortEventsByStartTime(joinedCurrentEvents),
                joinedPastEvents: sortEventsByStartTime(joinedPastEvents),
                allCurrentEvents: sortEventsByStartTime(allCurrentEvents),
            });
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to load events. Try refreshing the page.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (eventId && joinedEvents.length === 0) {
            const fetchSingleEvent = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const { events: fetchedEvents } = await fetchHackathonEvents();
                    const event = fetchedEvents[eventId];
                    if (event) {
                        setSingleEvent({
                            startTime: event.startTime,
                            endTime: event.endTime,
                            timeZone: event.timeZone,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching single event:", error);
                    setError("Failed to load event. Try refreshing the page.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSingleEvent();
        }
    }, [eventId, joinedEvents]);

    useEffect(() => {
        if (joinedEvents.length > 0) {
            fetchData();
        }
    }, [joinedEvents]);

    const getEndingEvent = useCallback((events: any[]) => {
        if (!events?.length) return null;
        const now = new Date();
        return events.find(event => {
            console.log(event);
            const endTime = new Date(event.endTime);
            const timeLeft = endTime.getTime() - now.getTime();
            console.log(timeLeft);
            return timeLeft > 0 && timeLeft <= 2 * 60 * 60 * 1000; // 2 hours
        });
    }, []);

    return {
        singleEvent,
        events,
        error,
        isLoading,
        getEndingEvent,
        refetchEvents: fetchData,
    };
};

export default useEvents;
