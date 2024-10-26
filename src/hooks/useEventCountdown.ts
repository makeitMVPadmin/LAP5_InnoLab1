import { useState, useEffect, useRef } from "react";
import useEvents from "./useEvents";

type EventDetails = {
    timeRemaining?: number;
    formattedTime?: string;
    formatTime: (time: number) => string;
    ended: boolean;
};

const useEventCountdown = (eventId: string, timeType: "start" | "end"): EventDetails => {
    const { singleEvent: event, isLoading, error } = useEvents([], eventId);
    const { endTime, startTime } = event || {};
    const targetTime = timeType === "start" ? startTime : endTime;
    const [ended, setEnded] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const formattedTimeRef = useRef<string>("");

    useEffect(() => {
        if (!eventId || !targetTime) {
            setEnded(false);
            formattedTimeRef.current = "";
            return;
        }

        const calculateRemainingTime = () => {
            const remainingTime = new Date(targetTime).getTime() - Date.now();
            setTimeRemaining(Math.max(remainingTime, 0));
            setEnded(remainingTime <= 0);

            // Update the formattedTimeRef
            formattedTimeRef.current = formatTime(Math.max(remainingTime, 0));
        };

        calculateRemainingTime(); // Initial calculation

        const interval = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(interval);
    }, [eventId, targetTime]);

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
