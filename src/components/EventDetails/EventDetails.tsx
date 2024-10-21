import "./EventDetails.scss";
import calender from "../../assets/images/calender.png";
import location from "../../assets/images/location.png";
import link from "../../assets/images/link.png";
import ongoing from "../../assets/images/ongoing.png";

export default function EventDetails() {
  return (
    <>
      <section className="event-details-top-right">
        <article className="event-details-top-right__status">
          <img className="event-details-top-right__status-img" src={ongoing} />
          <p className="event-details-top-right__status-txt">On-going</p>
        </article>
        <p>Organized by</p>
        <p>Starts:</p>
        <div className="event-details-top-right__time">
          <img src={calender} className="event-details-top-right__img" />
          <div className="event-details-top-right__time-txt">
            <p>Wednesday, Nov 28</p>
            <p>4:00 PM EST</p>
          </div>
        </div>
        <p>Ends:</p>
        <div className="event-details-top-right__time">
          <img src={calender} className="event-details-top-right__img" />
          <div className="event-details-top-right__time-txt">
            <p>Thursday, Nov 29</p>
            <p>4:00 PM EST</p>
          </div>
        </div>
        <div className="event-details-top-right__location">
          <img src={location} className="event-details-top-right__img" />
          <p className="event-details-top-right__location-txt">
            Location: Online
          </p>
        </div>
        <button className="event-details-top-right__button">
          <img src={link} className="event-details-top-right__link-img" />
          <p className="event-details-top-right__link-txt">Event Link</p>
        </button>
      </section>
    </>
  );
}
