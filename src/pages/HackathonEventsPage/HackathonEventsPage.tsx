import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useMemo, useState } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { ReactComponent as Sensors } from "../../assets/images/sensors.svg";
import { useAuth } from "../../context/AuthContext";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";
import EventForm from "../CreateEvent/EventForm";
import useEvents from "../../hooks/useEvents";
import Filters from "../../components/Filters/Filters";



const HackathonEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, isLoading, getEndingEvent } = useEvents(joinedEvents);
  const { allCurrentEvents, joinedCurrentEvents } = events || {};
  const [alertEvent, setAlertEvent] = useState(false);
  const [filters, setFilters] = useState({
    skillLevel: "",
    disciplines: "",
    themes: "",
    timeZone: "",
    duration: "",
  });

  useEffect(() => {
    setAlertEvent(getEndingEvent(joinedCurrentEvents));
  }, [joinedCurrentEvents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? "" : value,
    }));
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return durationInHours;
  };


  const filteredEvents = allCurrentEvents.filter((event) => {
    const duration = calculateDuration(event.startTime, event.endTime);

    const matchesSkillLevel =
      filters.skillLevel === "" ||
      (event.skillLevel &&
        event.skillLevel.toLowerCase() === filters.skillLevel.toLowerCase());

    const matchesDisciplines =
      filters.disciplines === "" ||
      (event.disciplines &&
        Array.isArray(event.disciplines) &&
        event.disciplines.some(
          (discipline) =>
            discipline.toLowerCase() === filters.disciplines.toLowerCase()
        ));

    const matchesThemes =
      filters.themes === "" ||
      (event.themes &&
        Array.isArray(event.themes) &&
        event.themes.some(
          (theme) => theme.toLowerCase() === filters.themes.toLowerCase()
        ));

    const matchesTimeZone =
      filters.timeZone === "" ||
      (event.timeZone &&
        event.timeZone.toLowerCase() === filters.timeZone.toLowerCase());

    const matchesDuration =
      filters.duration === "" ||
      (duration && filters.duration === "24 hours" && duration <= 24) ||
      (filters.duration === "48 hours" && duration > 24 && duration <= 48) ||
      (filters.duration === "72 hours" && duration > 48 && duration <= 72);

    return (
      matchesSkillLevel &&
      matchesDisciplines &&
      matchesThemes &&
      matchesTimeZone &&
      matchesDuration
    );
  });

  console.log("Filtered Events: ", filteredEvents);

  const displayCards = useMemo(() => {
    return (
      filteredEvents.map(event => (
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
          joined={joinedEvents.includes(event.id)}
        />
      ))
    );
  }, [allCurrentEvents, filteredEvents]);

  const renderEvents = () => {
    if (isLoading) return <div>Loading...</div>;
    if (filteredEvents.length === 0) return <div>No Events</div>;
    return displayCards;
  };
  return (
    <main className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <DashboardNavbar />
      <div className="h-[22%] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[15rem] min-h-[12.5rem]">
        <Link to="/" className="text-MVP-black cursor-pointer">← Back</Link>
        <div>
          <h1 className="font-corben text-[2.4rem] leading-[114%] md:text-[3rem] lg:text-[3rem]">Hackathon Events</h1>
          <p className="leading-[2.5]">Explore all the hackathon events</p>
        </div>
      </div>
      <div className="w-full flex justify-end gap-6 px-8 py-4 text-xl">
        <Link to="joined" className="flex relative gap-2 py-2 px-4 border-3 border-black rounded-md bg-MVP-green text-MVP-black font-gilroy">
          <Sensors className="w-7 h-7" />
          My Events
          {alertEvent &&
            <span className="absolute right-[-0.8em] top-[-0.8em] bg-MVP-black text-white text-sm rounded-full w-7 h-7 flex items-center justify-center">
              1
            </span>
          }
        </Link>
        <Link to="/EventForm" className="py-2 px-4 border-3 border-black rounded-[8px] bg-MVP-dark-blue text-MVP-white font-gilroy">Create Hackathon</Link>
      </div>
      <div className="w-full h-full flex gap-4 mt-4 px-8">
        <div className="flex-1 w-[20%]">
          <div className="event-page__filters flex-1 min-w-20%">
            <h3 className="event-page__heading">Filters</h3>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mx-4 w-[80%]">
          {renderEvents()}
        </div>
      </div>
    </main>
  );
};

export default HackathonEventsPage;
