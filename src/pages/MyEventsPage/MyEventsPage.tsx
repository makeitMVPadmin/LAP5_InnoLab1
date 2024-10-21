import EventCard from "../../components/EventCard/EventCard";
import { useState, useCallback, useMemo } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as RoundEventRepeat } from "../../assets/images/ic_round-event-repeat.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendarIcon.svg";
import CountdownBanner from "../../components/CountdownBanner/CountdownBanner";
import useEvents from "../../hooks/useEvents";
import useFilterEvents from "../../hooks/useFilterEvents";
import Filters from "../../components/Filters/Filters";

const MyEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, error, isLoading, refetchEvents } = useEvents(joinedEvents);
  const { joinedCurrentEvents, joinedPastEvents } = events;
  const [showCurrent, setShowCurrent] = useState(true);

  const handleCountdownEnd = () => {
    refetchEvents();
  };

  const toggleEvents = useCallback(() => {
    setShowCurrent(prev => !prev);
  }, []);

  const eventToggle = showCurrent
    ? { icon: <RoundEventRepeat className="h-7 w-7" />, label: 'Past Events' }
    : { icon: <CalendarIcon className="h-5 w-5 fill-MVP-black" />, label: 'Current Events' };

  const eventsToDisplay = showCurrent ? joinedCurrentEvents : joinedPastEvents;
  const { filteredEvents, filters, setFilters } = useFilterEvents(eventsToDisplay);

  const displayCards = useMemo(() => {
    return filteredEvents.map(event => (
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
    ));
  }, [filteredEvents, joinedEvents]);

  const renderEvents = () => {
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (filteredEvents.length === 0) {
      return <div>No {showCurrent ? "Current" : "Past"} Events</div>;
    }

    return displayCards;
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <div className="h-[16rem] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 bg-[url(src/assets/images/myeventsbanner.png)] bg-cover">
        <div className="flex flex-col h-fit w-fit px-[4.2rem] pt-[1.2rem] pb-[1.2rem] items-start rounded-[10px] bg-white/60 backdrop-blur-[15px]">
          <h1 className="font-corben text-[3.4rem] leading-[114%]">My Events</h1>
          <p className="leading-[2.5 font-gilroy font-extrabold leading-[3rem]">Explore all the events you joined</p>
        </div>
      </div>
      <CountdownBanner joinedEvents={joinedEvents} onCountdownEnd={handleCountdownEnd} />

      <div className="w-full flex justify-end text-base gap-3 px-8 pb-4">
        <button onClick={toggleEvents} className="flex py-2.5 px-6 justify-center text-xl items-center gap-2.5 rounded-lg border-t-[0.2rem] border-r-[0.3rem] border-b-[0.3rem] border-l-[0.2rem] border-black bg-MVP-white font-gilroy font-extrabold">
          {eventToggle.icon}
          {eventToggle.label}
        </button>
      </div>

      <div className="w-full h-full flex gap-4 mt-4 px-8">
        <div className="flex-1 w-[20%]">
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="grid grid-cols-3 gap-12 px-2">
          {renderEvents()}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;
