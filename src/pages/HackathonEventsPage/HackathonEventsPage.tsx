import "./HackathonEventsPage.scss";
import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { fetchHackathonEvents } from "../../Firebase/GetHackathonEvents";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";

const HackathonEventsPage = () => {
  const [hackathonEvents, setHackathonEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHackathonEvents();
      const eventsArray = Object.entries(data).map(([id, event]) => ({ id, ...event }));
      setHackathonEvents(eventsArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-page">
      <DashboardNavbar />
      <div className="event-page__banner">
        <Link to="/" className="join-event__back-link">← Back</Link>

        <h1 className="event-page__header">Hackathon Events</h1>
        <p className="event-page__sub-header">Explore all the hackathon events</p>
      </div>
      <div className="event-page__btn">
        <Link to="#" className="event-page__my-events">My Events</Link>
        <Link to="#" className="event-page__create-hackathon">Create Hackathon</Link>

      </div>
      <div className="event-page__container mt-4">
        <div className="event-page__filters">FILTER CONTAINER</div>
        <div className="flex flex-wrap gap-4 mx-4">
          {hackathonEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              imageUrl={event.imageUrl}
              title={event.title}
              startTime={event.startTime}
              endTime={event.endTime}
              timeZone={event.timeZone}
              skillLevel={event.skillLevel}
              themes={event.themes}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HackathonEventsPage;

