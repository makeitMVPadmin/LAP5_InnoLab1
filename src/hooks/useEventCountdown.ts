import { useState, useEffect, useRef } from "react";
import useEvents from "./useEvents";

type EventDetails = {
    timeRemaining?: number;
    formattedTime?: string;
    formatTime: (time: number) => string;
    ended: boolean;
};

const useEventCountdown = (eventId: string): EventDetails => {
    const { singleEvent: event, isLoading, error } = useEvents([], eventId);
    const { endTime } = event || {};
    const [ended, setEnded] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const formattedTimeRef = useRef<string>("");

    useEffect(() => {
        if (!eventId || !endTime) {
            setEnded(false);
            formattedTimeRef.current = "";
            return;
        }

        const calculateRemainingTime = () => {
            const remainingTime = new Date(endTime).getTime() - Date.now();
            setTimeRemaining(Math.max(remainingTime, 0));
            setEnded(remainingTime <= 0);

            // Update the formattedTimeRef
            formattedTimeRef.current = formatTime(Math.max(remainingTime, 0));
        };

        calculateRemainingTime(); // Initial calculation

        const interval = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(interval);
    }, [eventId, endTime]);

    const formatTime = (time: number) => {
        const hours = Math.floor((time % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((time % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return {
        timeRemaining: timeRemaining > 0 ? timeRemaining : 0,
        formattedTime: formattedTimeRef.current,
        formatTime,
        ended,
    };
};

export default useEventCountdown;
