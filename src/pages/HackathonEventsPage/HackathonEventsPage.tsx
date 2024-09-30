import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { fetchHackathonEvents } from "../../Firebase/GetHackathonEvents";


const Home = () => {
    const [hackathonEvents, setHackathonEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchHackathonEvents();
            setHackathonEvents(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">

            {hackathonEvents.map((event, index) => (
                <EventCard key={index} imageUrl={event.imageUrl} title={event.title} startTime={event.startTime} endTime={event.endTime} timeZone={event.timeZone} skillLevel={event.skillLevel} themes={event.themes} />
            ))}
        </div>
    );
};

export default Home;
