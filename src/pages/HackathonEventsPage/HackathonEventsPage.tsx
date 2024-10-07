import "./HackathonEventsPage.scss";
import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { fetchHackathonEvents } from "../../Firebase/GetHackathonEvents";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";
import Filters from "../../components/Filters/Filters";

const HackathonEventsPage = () => {
  const [hackathonEvents, setHackathonEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    skillLevel: "",
    discipline: "",
    format: "",
    timeZone: "",
    // duration: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHackathonEvents();
      console.log(data);
      setHackathonEvents(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredEvents = hackathonEvents.filter((event) => {
    return (
      filters.skillLevel === "" ||
      event.skillLevel.toLowerCase() === filters.skillLevel.toLowerCase()
    );
  });
  console.log("Filtered Events: ", filteredEvents);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-page">
      <DashboardNavbar />
      <div className="event-page__banner">
        <Link to="/" className="event-page__btn-navigate-back">
          ← Back
        </Link>
        <h1 className="event-page__header">Hackathon Events</h1>
        <p className="event-page__sub-header">
          Explore all the hackathon events
        </p>
      </div>
      <div className="event-page__btn">
        <Link to="#" className="event-page__my-events">
          My Events
        </Link>
        <Link to="#" className="event-page__create-hackathon">
          Create Hackathon
        </Link>
      </div>
      <div className="event-page__container">
        <div className="event-page__filters">
          <h3 className="event-page__heading">Filters</h3>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="event-page__event-cards">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                startTime={event.startTime}
                endTime={event.endTime}
                timeZone={event.timeZone}
                skillLevel={event.skillLevel}
                imageUrl={event.imageUrl}
                themes={event.themes}
              />
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonEventsPage;
