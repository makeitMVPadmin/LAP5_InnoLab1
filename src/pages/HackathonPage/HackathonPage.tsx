import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";


const Home = () => {
    const [hackathonEvents, setHackathonEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, "hackathonEvents");
            const querySnapshot = await getDocs(colRef);
            const data = querySnapshot.docs.map((doc) => doc.data());
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
            <h1 className="home__title">Hello</h1>
            {hackathonEvents.map((event, index) => (
                <EventCard key={index} title={event.title} startTime={event.startTime} endTime={event.endTime} timeZone={event.timeZone} skillLevel={event.skillLevel} themes={event.themes} />
            ))}
        </div>
    );
};

export default Home;
