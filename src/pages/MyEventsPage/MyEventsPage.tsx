import EventCard from "../../components/EventCard/EventCard";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { useAuth } from "../../context/AuthContext";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { ReactComponent as RoundEventRepeat } from "../../assets/images/ic_round-event-repeat.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendarIcon.svg";
import { Link } from "react-router-dom";
import CountdownBanner from "../../components/CountdownBanner/CountdownBanner";
import useEvents from "../../hooks/useEvents";

const MyEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, error, isLoading, refetchEvents } = useEvents(joinedEvents);
  const { joinedCurrentEvents, joinedPastEvents } = events;
  const [ showCurrent, setShowCurrent ] = useState(true);

  const handleCountdownEnd = () => {
    refetchEvents();
  };

  const toggleEvents = useCallback(() => {
    setShowCurrent(prev => !prev);
  }, []);

  const eventToggle = showCurrent 
    ? { icon: <RoundEventRepeat className="h-6 w-6"/>, label: 'Past Events' } 
    : { icon: <CalendarIcon className="h-5 w-5 fill-MVP-black"/>, label: 'Current Events' };

    const displayCards = useMemo(() => {
      return (
        showCurrent
          ? joinedCurrentEvents.map(event => (
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
          : joinedPastEvents.map(event => (
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
    }, [joinedEvents, showCurrent, joinedCurrentEvents, joinedPastEvents]);

    const renderEvents = () => {
      if (error) {
        return <div>{error}</div>;
      }
      
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (showCurrent) {
        if (joinedCurrentEvents.length === 0) {
          return <div>No Current Events</div>;
        }
      } else {
        if (joinedPastEvents.length === 0) {
          return <div>No Past Events</div>;
        }
      }
    
      return displayCards;
    };

  return (
    <div className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <DashboardNavbar />
      <div className="h-[22%] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[15rem] min-h-[12.5rem]">
        <Link to="/hackathons" className="text-MVP-black cursor-pointer">← Back</Link>
        <div>
          <h1 className="font-corben text-[2.4rem] leading-[114%] md:text-[3rem] lg:text-[3rem]">My Events</h1>
          <p className="leading-[2.5]">Look at the events you have joined</p>
        </div>
      </div>
      <CountdownBanner joinedEvents={joinedEvents} onCountdownEnd={handleCountdownEnd} />

      <div className="w-full flex justify-end text-base gap-3 px-8 pb-4">
        <button onClick={toggleEvents} className="flex items-center py-2 px-4 text-xl gap-2 border-3 border-black rounded-md bg-MVP-green text-MVP-black font-gilroy content-center">
          {eventToggle.icon}
          {eventToggle.label}
        </button>
      </div>
      <div className="w-full h-full flex gap-4 mt-4 px-8">
        <div className="flex-1 border-3 border-black w-[20%]">FILTER CONTAINER</div>
        <div className="flex flex-wrap gap-4 mx-4 w-[80%]">
        {renderEvents()}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;
