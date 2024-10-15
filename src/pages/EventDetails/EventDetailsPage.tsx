import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import "./EventDetailsPage.scss";
import { fetchHackathonEvents } from "../../Firebase/GetHackathonEvents";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

type HackathonEvent = {
  basicProjectSummary: string;
  createdAt: string;
  disciplines: string[];
  email: string;
  endTime: string;
  firstName: string;
  fullDetails: Record<string, string>;
  imageUrl: string;
  judges: string[];
  lastName: string;
  meetingLink: string;
  participantCount: number;
  skillLevel: string;
  startTime: string;
  submissionsId: string[];
  themes: string[];
  timeZone: string;
  title: string;
};

const EventDetailsPage = () => {
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

    return(
        <div className="event-details-page">
        <DashboardNavbar/>
            <div className="event-details-page__banner">
            <Link to="/" className="join-event__back-link">← Back</Link>
            </div>

            
            {/* <div className = "event-details-page_join-button">
                <Link to={`join-event/${eventId}`} className = "event-details-page__join-event-button">
                 Join Event
                </Link>
            </div> */}

        </div>
    )
}




// const EventDetailsPage = () => {
//   const { id } = useParams<{ id: string }>(); // Get event ID from URL params
//   const [eventDetails, setEventDetails] = useState<HackathonEvent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <div className="event-details-page">
//       <div className="event-details-page__banner">
//         <Link to="/" className="event-details-page__back-btn">← Back to Events</Link>
//         <h1 className="event-details-page__title">{eventDetails.title}</h1>
//       </div>

//       <div className="event-details-page__content">
//         <img
//           src={eventDetails.imageUrl}
//           alt={eventDetails.title}
//           className="event-details-page__image"
//         />
//         <div className="event-details-page__info">
//           <p><strong>Basic Project Summary:</strong> {eventDetails.basicProjectSummary}</p>
//           <p><strong>Created At:</strong> {new Date(eventDetails.createdAt).toLocaleString()}</p>
//           <p><strong>Start Time:</strong> {new Date(eventDetails.startTime).toLocaleString()}</p>
//           <p><strong>End Time:</strong> {new Date(eventDetails.endTime).toLocaleString()}</p>
//           <p><strong>Time Zone:</strong> {eventDetails.timeZone}</p>
//           <p><strong>Skill Level:</strong> {eventDetails.skillLevel}</p>
//           <p><strong>Disciplines:</strong> {eventDetails.disciplines.join(", ")}</p>
//           <p><strong>Themes:</strong> {eventDetails.themes.join(", ")}</p>
//           <p><strong>Participant Count:</strong> {eventDetails.participantCount}</p>
//           <p><strong>Judges:</strong> {eventDetails.judges.join(", ")}</p>
//           <p><strong>Submissions:</strong> {eventDetails.submissionsId.join(", ")}</p>
//           {eventDetails.meetingLink && (
//             <p><strong>Meeting Link:</strong> <a href={eventDetails.meetingLink}>{eventDetails.meetingLink}</a></p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
//     // return(
//     //     <div>
//     //         <p>
//     //             Test
//     //         </p>
//     //     </div>
//     // )

    
// };

export default EventDetailsPage;


