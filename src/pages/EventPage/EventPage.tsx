import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchHackathonEvents } from "../../Firebase/FirebaseQueries";
import { HackathonEventType } from "../../Firebase/FirebaseQueries";
import { STYLES } from '../../constants/styles';
import Header from "../../components/Header/Header";
import DetailCard from "../../components/DetailCard/DetailCard";
import ParticipantInfoChip from "../../components/ParticipantInfoChip/ParticipantInfoChip";
import StackedProfiles from "../../components/StackedProfiles/StackedProfiles";
import Clock from "../../assets/images/clockIcon.svg"
import useEventData from "../../hooks/usEventData";
import ExportButton from "../../components/ExportButton/ExportButton";

const EventPage = () => {
    const [event, setEvent] = useState<HackathonEventType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { eventId } = useParams()
    const navigate = useNavigate()
    const {
        submissions,
        participantCount,
        formattedUserNames,
        exportData,
        exportFields,
    } = useEventData(eventId);


    useEffect(() => {
        async function loadEvent() {
            setIsLoading(true);
            setError(null);

            try {
                const { event, error } = await fetchHackathonEvents(eventId);

                if (error) {
                    setError(error);
                } else {
                    setEvent(event);

                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }

        loadEvent();
    }, [eventId]);

    console.log(event)
    const formatThemes = [...(event?.themes || []), ...(event?.disciplines || [])];


    if (isLoading) { return <p>Loading...</p>; }
    if (error) { return <p>Error: {error}</p>; }

    return (
        <main className="w-full  relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
            <Header handleClick={() => navigate(-1)} />
            <div className="w-full max-w-[1130px] h-full flex flex-col m-auto pb-32">
                <div className="h-72 w-full bg-cover m-auto">
                    <img className="h-full w-full object-cover" src={event.imageUrl} alt={`hero for ${event.title}`} />
                </div>
                <section className="gap-6 space-y-6">
                    <div className="flex">
                        {/* Event Details Left*/}
                        <div className="px-6 flex flex-col gap-6 w-3/4">
                            <div className="flex items-center gap-2 mt-8" role="alert">
                                <img className="h-4" src={Clock} alt="Clock icon indicating time remaining" />
                                <span className="font-gilroy text-xl">Event Starts in: 10h 55m 55s</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-gilroy mt-8">{event.title}</h1>
                            <DetailCard text={event.skillLevel} />
                            <p className="font-poppins">{event.basicProjectSummary}</p>
                            <section aria-labelledby="themes">
                                <h2 id="themes" className="font-bold font-gilroy text-3xl my-3">Themes</h2>
                                <div className="flex gap-3 flex-wrap">
                                    {formatThemes.map((theme, index) => (
                                        <DetailCard key={index} text={theme} />
                                    ))}
                                </div>
                            </section>
                            <section aria-labelledby="judges">
                                <h2 id="judges" className="font-bold font-gilroy text-3xl my-3">Judges</h2>
                                <div className="flex gap-3 flex-wrap">
                                    {event.judges.map((judge, index) => (
                                        <ParticipantInfoChip key={index} integer={index} fullName={judge} role="Software Developer" />
                                    ))}
                                </div>
                            </section>
                        </div>
                        {/* Event Details Right*/}
                        <div className="border-black border">
                            {/* Hilary's code here*/}
                        </div>

                    </div>
                    <section className="w-3/4 px-6 ">
                        <div className="flex justify-start gap-8">
                            <div className="flex gap-3 items-center">
                                <h3 className="font-bold font-gilroy text-2xl my-3">Registrants</h3>
                                <span>({submissions.length}/{participantCount})</span>
                            </div>
                            <ExportButton data={exportData} fields={exportFields} />
                        </div>
                        <div className="flex flex-col">
                            <StackedProfiles />
                            <p className="font-poppins mt-12">{formattedUserNames}</p>
                        </div>
                    </section>
                    <section className="w-3/4 px-6 ">
                        {/* Hilary's code here*/}

                    </section>

                </section>



            </div>
            <section className="h-[100px] w-full fixed bottom-0 px-8 border-t-[3px] border-MVP-black bg-MVP-white flex justify-between items-center">
                <div className="flex gap-2 ">
                    <img className="h-6" src={Clock} alt="clock icon" />
                    <p className="font-gilroy">Time left to submit: 50m:15s</p>
                </div>
                <button className={`${STYLES.primaryButton} rounded-[10px] w-auto`} aria-label="Submit Project">
                    {/* TO DO Make eventId dynamic  */}
                    <Link to={`/event/0wPdqmuwFXyZawaf2Q9d/submit`} >Submit Project</Link>
                </button>
            </section>
        </main>)
}


export default EventPage