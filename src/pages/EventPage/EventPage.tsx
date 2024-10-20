import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { STYLES } from '../../constants/styles';
import Clock from "../../assets/images/clockIcon.svg"
import { fetchHackathonEvents } from "../../Firebase/FirebaseQueries";
import Header from "../../components/Header/Header";
import { HackathonEventType } from "../../Firebase/FirebaseQueries";

const EventPage = () => {
    const [event, setEvent] = useState<HackathonEventType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { eventId } = useParams()
    const navigate = useNavigate()

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

    if (isLoading) { return <p>Loading...</p>; }
    if (error) { return <p>Error: {error}</p>; }

    return (
        <main className="w-full  relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
            <Header handleClick={() => navigate(-1)} />
            <div className="w-full max-w-[1130px] h-full flex m-auto">
                <div className="h-96 w-full bg-cover m-auto">
                    <img className="h-full w-full object-cover" src={event.imageUrl} />
                </div>
                <section>
                    {/* Event Details Left*/}
                    <div>

                    </div>
                    {/* Event Details Right*/}
                    <div>

                    </div>
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