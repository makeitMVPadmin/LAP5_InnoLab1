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
    disciplines: "",
    themes: "",
    timeZone: "",
    duration: "",
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

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return durationInHours;
  };

  const filteredEvents = hackathonEvents.filter((event) => {
    const duration = calculateDuration(event.startTime, event.endTime);
    return (
      (filters.skillLevel === "" ||
        (event.skillLevel &&
          event.skillLevel.toLowerCase() ===
            filters.skillLevel.toLowerCase())) &&
      (filters.disciplines === "" ||
        (event.disciplines &&
          Array.isArray(event.disciplines) &&
          event.disciplines.some(
            (discipline) =>
              discipline.toLowerCase() === filters.disciplines.toLowerCase()
          ))) &&
      (filters.themes === "" ||
        (event.themes &&
          Array.isArray(event.themes) &&
          event.themes.some(
            (themes) => themes.toLowerCase() === filters.themes.toLowerCase()
          ))) &&
      (filters.timeZone === "" ||
        (event.timeZone &&
          event.timeZone.toLowerCase() === filters.timeZone.toLowerCase())) &&
      (filters.duration === "" ||
        (duration && filters.duration === "24 hours" && duration <= 24) ||
        (filters.duration === "48 hours" && duration > 24 && duration <= 48) ||
        (filters.duration === "72 hours" && duration > 48 && duration <= 72))
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
