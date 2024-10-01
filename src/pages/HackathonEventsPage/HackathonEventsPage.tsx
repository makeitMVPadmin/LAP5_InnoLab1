import "./HackathonEventsPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { Link } from "react-router-dom";

const HackathonEventsPage = () => {

  return (
    <div className="event-page">
      <DashboardNavbar/>
      <div className="event-page__banner">
        <Link to="/" className="event-page__btn-navigate-back">← Back</Link>
        <h1 className="event-page__header">Hackathon Events</h1>
        <p className="event-page__sub-header">Explore all the hackathon events</p>
      </div>
      <div className="event-page__btn">
        <Link to="#" className="event-page__my-events">My Events</Link>
        <Link to="#" className="event-page__create-hackathon">Create Hackathon</Link>
      </div>
      <div className="event-page__container">
        <div className="event-page__filters">FILTER CONTAINER</div>
        <div className="event-page__event-cards">CARDS CONTAINER</div>
      </div>
    </div>
  );
}

export default HackathonEventsPage;
