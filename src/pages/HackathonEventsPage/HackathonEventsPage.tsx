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
    <div className="w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <DashboardNavbar />
      <div className="h-[25%] bg-MVP-light-gray">
        <Link to="/" className="text-MVP-black">← Back</Link>
        <h1 className="font-corben text-[8vw] leading-[114%] md:text-[3vw] lg:text-[2vw]">Hackathon Events</h1>
        <p className="">Explore all the hackathon events</p>
      </div>
      <div className="w-full flex justify-end text-base gap-3">
        <Link to="joined" className="p-2 border-3 border-black rounded-md bg-MVP-green text-MVP-black font-gilroy">My Events</Link>
        <Link to="#" className="p-2 px-4 border-3 border-black rounded-[8px] bg-MVP-dark-blue text-MVP-white font-gilroy">Create Hackathon</Link>

      </div>
      <div className="w-full h-full flex gap-4 mt-4">
        <div className="flex-1 border-3 border-black w-[20%]">FILTER CONTAINER</div>
        <div className="flex flex-wrap gap-4 mx-4 w-[80%]">
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

