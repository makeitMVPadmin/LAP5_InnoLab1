import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useEvents from "../../hooks/useEvents";

const CountdownBanner: React.FC<{ joinedEvents: string[], onCountdownEnd: () => void }> = ({ joinedEvents, onCountdownEnd }) => {
    const { events, getEndingEvent } = useEvents(joinedEvents);
    const { joinedCurrentEvents } = events;
    const [countdown, setCountdown] = useState("");
    const [eventAlert, setEventAlert] = useState(null);

    useEffect(() => {
        const eventEndingSoon = getEndingEvent(joinedCurrentEvents);
        if (eventEndingSoon) {
            const { title, id, endTime } = eventEndingSoon;
            setEventAlert({
                title: title,
                eventId: id,
                endTime: endTime
            });
        } else {
            setEventAlert(null);
        }
    }, [joinedCurrentEvents]);

    const updateCountdown = useCallback(() => {
        if (!eventAlert) return;

        const { endTime } = eventAlert;
        const eventEndTime = new Date(endTime);
        const now = new Date();
        const timeLeftInMilliseconds = eventEndTime.getTime() - now.getTime();

        if (timeLeftInMilliseconds <= 0) {
            setCountdown("");
            setEventAlert(null);
            onCountdownEnd();
            return;
        }

        const minutesLeft = Math.floor((timeLeftInMilliseconds / 1000 / 60) % 60);
        const secondsLeft = Math.floor((timeLeftInMilliseconds / 1000) % 60);
        const newCountdown = `${minutesLeft}m: ${String(secondsLeft).padStart(2, '0')}s`;

        setCountdown(newCountdown);
    }, [eventAlert, onCountdownEnd]);

    useEffect(() => {
        if (!eventAlert) {
            setCountdown("");
            return;
        }

        const intervalId = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(intervalId);
    }, [eventAlert, updateCountdown]);

    if (!eventAlert) {
        return null;
    }

    const { title, eventId } = eventAlert;

    return (
        <div className="flex flex-wrap mx-8 my-4 min-h-fit rounded-[12px] h-[8%] bg-MVP-soft-blue px-8 py-4 font-poppins justify-between items-center">
            <div className="flex flex-col gap-1 h-fit">
                <h1 className="text-2xl">{title}</h1>
                <h2 className="font-gilroy text-xl">Submissions Close in {countdown}</h2>
            </div>
            <Link to={`/join-event/${eventId}`} className="h-fit rounded-[10px] border-y-[3px] border-x-[5px] py-3 px-6 border-MVP-black bg-MVP-yellow text-[#161616] text-center font-gilroy text-xl normal-case font-extrabold leading-[115.645%] tracking-tight">
                Submit Project
            </Link>
        </div>
    );
};

export default CountdownBanner;
