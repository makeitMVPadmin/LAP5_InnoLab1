import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { ReactComponent as CalendarRewind } from "../../assets/images/ic_round-event-repeat.svg";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";
import useFilterEvents from "../../hooks/useFilterEvents";
import Filters from "../../components/Filters/Filters";
import { useEventSubmissions } from "../../hooks/useEventSubmissions";
import { auth } from "../../Firebase/FirebaseConfig";

const HackathonEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, isLoading, getEndingEvent } = useEvents(joinedEvents);
  const { allCurrentEvents, joinedCurrentEvents } = events || {};
  const { filters, setFilters, filteredEvents } = useFilterEvents(allCurrentEvents);
  const [alertEvent, setAlertEvent] = useState(false);
  const eventEndingSoon = getEndingEvent(joinedCurrentEvents);
  const { allSubmissions: submissions } = useEventSubmissions(eventEndingSoon?.id);
  const submission = submissions
    .find(submission => submission.userId === auth.currentUser?.uid) || null
  
    useEffect(() => {
      if (eventEndingSoon) {
        setAlertEvent(true);
      } else {
        setAlertEvent(false);
      }
    }, [eventEndingSoon]);

    useEffect(() => {
      if (submission) {
        setAlertEvent(false);
      }
    }, [submission]);

  const displayCards = filteredEvents?.map(event => (
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

    if (!filteredEvents || filteredEvents.length === 0) return <div>No Events</div>;

    return displayCards;
  };
  return (
    <main className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <div className="h-[18.5rem] bg-MVP-light-gray flex flex-col justify-center bg-[url(src/assets/images/hackathoneventsbanner.png)] bg-cover">
        <div className="flex flex-col h-fit w-fit px-[4.2rem] pt-[1.2rem] pb-[1.2rem] ml-12 items-start rounded-[10px] bg-white/60 backdrop-blur-[15px]">
          <h1 className="font-corben text-[3.4rem] leading-[114%]">Events</h1>
          <p className="leading-[2.5 font-gilroy font-extrabold leading-[3rem]">Explore all the hackathon events</p>
        </div>
      </div>
      <div className="w-full flex justify-end gap-6 px-12 py-8 text-2xl font-gilroy font-extrabold">
        <Link to="joined" className="relative flex py-2.5 px-6 justify-center text-xl items-center gap-2.5 rounded-lg border-t-[0.2rem] border-r-[0.3rem] border-b-[0.3rem] border-l-[0.2rem] border-black bg-MVP-white font-gilroy font-extrabold">
          <CalendarRewind className="w-7 h-7" />
          My Events
          {alertEvent &&
            <span className="absolute right-[-0.8em] top-[-0.8em] bg-MVP-black text-white text-sm rounded-full w-7 h-7 flex items-center justify-center">
              1
            </span>
          }
        </Link>
        <Link to="/EventForm" className="flex py-2.5 px-6 justify-center text-xl items-center gap-2.5 rounded-lg border-t-[0.2rem] border-r-[0.3rem] border-b-[0.3rem] border-l-[0.2rem] border-black font-gilroy font-extrabold bg-MVP-dark-blue text-MVP-white">Create Hackathon</Link>
      </div>
      <div className="w-full h-full flex gap-4 mt-2 px-8">
        <div className="flex-1 w-[40%] md:w-[25%]">
          <h2 className="font-gilroy text-3xl pb-8 font-bold">Filters</h2>
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="flex flex-wrap gap-10 w-3/4 pr-4">
          {renderEvents()}
        </div>
      </div>
    </main>
  );
};

export default HackathonEventsPage;