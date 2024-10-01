import "./HackathonEventsPage.scss";
<<<<<<< Updated upstream
=======
import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { fetchHackathonEvents } from "../../Firebase/GetHackathonEvents";
>>>>>>> Stashed changes
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";

const HackathonEventsPage = () => {

<<<<<<< Updated upstream
  return (
    <div className="event-page">
      <DashboardNavbar/>
      <div className="event-page__banner">
        <Link to="/" className="event-page__btn-navigate-back">← Back</Link>
        <h1 className="event-page__header">Hackathon Events</h1>
        <p className="event-page__sub-header">Explore all the hackathon events</p>
      </div>
      <div className="event-page__btn">
        <Link to="#" className="event-page__my-events">My Events</Link>
        <Link to="#" className="event-page__create-hackathon">Create Hackathon</Link>
      </div>
      <div className="event-page__container">
        <div className="event-page__filters">FILTER CONTAINER</div>
        <div className="event-page__event-cards">CARDS CONTAINER</div>
      </div>
    </div>
  );
}

=======
const HackathonEventsPage = () => {
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
        <div className="event-page">
        <DashboardNavbar/>
        <div className="event-page__banner">
          <Link to="/" className="event-page__btn-navigate-back">← Back</Link>
          <h1 className="event-page__header">Hackathon Events</h1>
          <p className="event-page__sub-header">Explore all the hackathon events</p>
        </div>
        <div className="event-page__btn">
          <Link to="#" className="event-page__my-events">My Events</Link>
          <Link to="#" className="event-page__create-hackathon">Create Hackathon</Link>
        </div>
        <div className="event-page__container">
          <div className="event-page__filters">FILTER CONTAINER</div>
          <div className="event-page__event-cards">
            {hackathonEvents.map((event, index) => (
                <EventCard key={index} imageUrl={event.imageUrl} title={event.title} startTime={event.startTime} endTime={event.endTime} timeZone={event.timeZone} skillLevel={event.skillLevel} themes={event.themes} />
            ))}
            </div>
        </div>
    </div>
    );
};

>>>>>>> Stashed changes
export default HackathonEventsPage;
