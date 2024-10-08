// useEvents.js
import { useState, useEffect } from "react";
import { fetchHackathonEvents } from "../Firebase/FirebaseQueries";
import { sortEventsByStartTime } from "../utils/sortEventsFunctions";

const useEvents = (joinedEvents: string[]) => {
    const [events, setEvents] = useState({ joinedCurrentEvents: [], joinedPastEvents: [], allCurrentEvents: [] });
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
  
        setEvents({
          joinedCurrentEvents: sortEventsByStartTime(joinedCurrentEvents),
          joinedPastEvents: sortEventsByStartTime(joinedPastEvents),
          allCurrentEvents: sortEventsByStartTime(allCurrentEvents)
        });
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    const getEndingEvent = (events) => {
        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        
        return events.find(event => {
            const eventEndTime = new Date(event.endTime);
            return eventEndTime > now && eventEndTime <= oneHourLater;
        }) || null;
    };
  
    useEffect(() => {
      if (joinedEvents.length) {
        fetchData();
      }
    }, [joinedEvents]);
  
    return {
      events,
      error,
      isLoading,
      getEndingEvent,
      refetchEvents: fetchData,
    };
  };

  export default useEvents;
  
