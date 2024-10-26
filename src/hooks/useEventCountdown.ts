import { useState, useEffect } from "react";
import useEvents from "./useEvents";

type EventDetails = {
    timeRemaining?: number;
    formattedTime?: string;
    formatTime: (time: number) => string;
    ended: boolean;
};

const useEventCountdown = (eventId: string): EventDetails => {
    const { singleEvent: event, isLoading, error } = useEvents([], eventId); // grabs the event using the eventId props
    const { endTime } = event || {};

    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        setTimeRemaining(new Date(endTime).getTime() - Date.now());
        const interval = setInterval(() => {
            setTimeRemaining(new Date(endTime).getTime() - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time: number) => {
        const hours = Math.floor((time % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((time % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const formattedTime = formatTime(timeRemaining); // returns in format of hh:mm:ss

    return {
        timeRemaining: timeRemaining > 0 ? timeRemaining : 0, // if no time remaining, passes 0
        formattedTime,
        formatTime,
        ended: timeRemaining <= 0 // returns boolean for if theres time remaining
    };
};

export default useEventCountdown;
