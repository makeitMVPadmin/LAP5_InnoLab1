import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useMemo, useState } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { ReactComponent as Sensors } from "../../assets/images/sensors.svg";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useEvents from "../../hooks/useEvents";
import useFilterEvents from "../../hooks/useFilterEvents";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";

const HackathonEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, isLoading, getEndingEvent } = useEvents(joinedEvents);
  const { allCurrentEvents = [], joinedCurrentEvents = [] } = events || {};
  const {
    filters,
    setFilters,
    filteredEvents = [],
  } = useFilterEvents(allCurrentEvents);
  const [alertEvent, setAlertEvent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAlertEvent(getEndingEvent(joinedCurrentEvents));
  }, [joinedCurrentEvents]);

  const displayCards = filteredEvents?.map((event) => (
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
      joined={joinedEvents?.includes(event.id)}
    />
  ));

  const renderEvents = () => {
    if (isLoading) return <div>Loading...</div>;

    if (!filteredEvents || filteredEvents.length === 0)
      return <div>No Events</div>;

    return displayCards;
  };
  return (
    <main className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <Header handleClick={() => navigate("/")} />
      <div className="h-[22%] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[15rem] min-h-[12.5rem] bg-">
        <div className="pl-4">
          <h1 className="font-corben text-[2.4rem] leading-[114%] md:text-[3rem] lg:text-[3rem]">
            Events
          </h1>
          <p className="leading-[2.5]">Explore all the hackathon events</p>
        </div>
        <div className="event-page__container">
          <div className="event-page__filters">FILTER CONTAINER</div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-6 px-8 py-4 text-xl">
        <Link
          to="joined"
          className="flex relative gap-2 py-2 px-4 border-3 border-black rounded-md bg-MVP-green text-MVP-black font-gilroy"
        >
          <Sensors className="w-7 h-7" />
          My Events
          {alertEvent && (
            <span className="absolute right-[-0.8em] top-[-0.8em] bg-MVP-black text-white text-sm rounded-full w-7 h-7 flex items-center justify-center">
              1
            </span>
          )}
        </Link>
        <Link
          to="/EventForm"
          className="py-2 px-4 border-3 border-black rounded-[8px] bg-MVP-dark-blue text-MVP-white font-gilroy"
        >
          Create Hackathon
        </Link>
      </div>
      <div className="w-full h-full flex gap-4 mt-4 px-8">
        <div className="flex-1 w-[40%] md:w-[25%]">
          <h2 className="font-gilroy text-3xl pb-8">Filters</h2>
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="flex flex-wrap gap-4 w-3/4 flex-end">
          {renderEvents()}
        </div>
      </div>
    </main>
  );
};

export default HackathonEventsPage;
