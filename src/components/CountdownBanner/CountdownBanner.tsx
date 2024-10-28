import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useEvents from "../../hooks/useEvents";
import useEventCountdown from "../../hooks/useEventCountdown";
import { useEventSubmissions } from "../../hooks/useEventSubmissions";
import { auth } from "../../Firebase/FirebaseConfig";

const CountdownBanner: React.FC<{ joinedEvents: string[], onCountdownEnd: () => void }> = ({ joinedEvents, onCountdownEnd }) => {
    const { events, getEndingEvent } = useEvents(joinedEvents);
    const { joinedCurrentEvents } = events;
    const [eventAlert, setEventAlert] = useState(null);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    useEffect(() => {
        const eventEndingSoon = getEndingEvent(joinedCurrentEvents);
        if (eventEndingSoon) {
            const { title, id, endTime } = eventEndingSoon;
            setEventAlert({ title, eventId: id, endTime });
        } else {
            setEventAlert(null);
        }
    }, [joinedCurrentEvents, getEndingEvent]);

    const { allSubmissions: submissions } = useEventSubmissions(eventAlert?.eventId);
    const submission = submissions?.find(sub => sub.userId === auth.currentUser?.uid) || null;

    useEffect(() => {
        if (submission) {
            setAlreadySubmitted(true);
        }
    }, [submission]);

    const { formattedTime, ended } = useEventCountdown(eventAlert?.eventId || '', "end");

    useEffect(() => {
        if (ended) {
            setEventAlert(null);
            onCountdownEnd();
        }
    }, [ended, onCountdownEnd]);

    if (!eventAlert) {
        return null;
    }

    const { title } = eventAlert;

    return (
        alreadySubmitted ? null : (
            <div className="flex flex-wrap mx-8 my-4 min-h-fit rounded-[12px] h-[8%] bg-MVP-soft-blue px-8 py-4 font-poppins justify-between items-center">
                <div className="flex flex-col gap-1 h-fit">
                    <h1 className="text-2xl">{title}</h1>
                    <h2 className="font-gilroy text-xl">Submissions Close in {formattedTime}</h2>
                </div>
                <Link to={`/event/${eventAlert.eventId}/submit`} className="h-fit rounded-[10px] border-y-[3px] border-x-[5px] py-3 px-6 border-MVP-black bg-MVP-yellow text-[#161616] text-center font-gilroy text-xl normal-case font-extrabold leading-[115.645%] tracking-tight">
                    Submit Project
                </Link>
            </div>
        )
    );
};

export default CountdownBanner;
