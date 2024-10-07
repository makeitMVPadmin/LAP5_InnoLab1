import EventCard from "../../components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { ReactComponent as Sensors } from "../../assets/images/sensors.svg";
import { useAuth } from "../../context/AuthContext";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";

const HackathonEventsPage = () => {
  const { currentUser } = useAuth();
  const { joinedEvents } = useJoinedEvents(currentUser?.uid);
  const { events, getEndingEvent } = useEvents(joinedEvents);
  const { allCurrentEvents } = events;
  const [ alertEvent, setAlertEvent ] = useState(false);

  useEffect(() => {
    const checkEvents = getEndingEvent(events.joinedCurrentEvents);
    if (checkEvents) {
      setAlertEvent(true);
  } else {
      setAlertEvent(false);
  }
  }, [events]);

  return (
    <div className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <DashboardNavbar />
      <div className="h-[22%] bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[15rem] min-h-[12.5rem]">
        <Link to="/" className="text-MVP-black cursor-pointer">← Back</Link>
        <div>
          <h1 className="font-corben text-[2.4rem] leading-[114%] md:text-[3rem] lg:text-[3rem]">Hackathon Events</h1>
          <p className="leading-[2.5]">Explore all the hackathon events</p>
        </div>
      </div>
      <div className="w-full flex justify-end text-base gap-6 px-8 py-4 text-xl">
        <Link to="joined" className="flex relative gap-2 py-2 px-4 border-3 border-black rounded-md bg-MVP-green text-MVP-black font-gilroy">
          <Sensors className="w-7 h-7"/>
          My Events
          {alertEvent &&
            <span className="absolute right-[-0.8em] top-[-0.8em] bg-MVP-black text-white text-sm rounded-full w-7 h-7 flex items-center justify-center">
              1
            </span>
          }
        </Link>
        <Link to="#" className="py-2 px-4 border-3 border-black rounded-[8px] bg-MVP-dark-blue text-MVP-white font-gilroy">Create Hackathon</Link>
      </div>
      <div className="w-full h-full flex gap-4 mt-4 px-8">
        <div className="flex-1 border-3 border-black w-[20%]">FILTER CONTAINER</div>
        <div className="flex flex-wrap gap-4 mx-4 w-[80%]">
        {allCurrentEvents.length === 0 ? (
            <div>Loading...</div>
          ) :
            allCurrentEvents.map(event => (
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
          }
        </div>
      </div>

    </div>
  );
};

export default HackathonEventsPage;

