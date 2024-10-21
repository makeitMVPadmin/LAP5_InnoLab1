import "./EventDetails.scss";
import calender from "../../assets/images/calender.png";
import location from "../../assets/images/location.png";
import link from "../../assets/images/link.png";
import ongoing from "../../assets/images/ongoing.png";

export default function EventDetails() {
  return (
    <>
      {/* top right section */}
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

      {/* bottom section */}
      <section className="event-details-bottom">
        <h2 className="event-details-bottom__title">Challenge Details</h2>
        <div className="event-details-bottom__wrapper">
          <h3 className="event-details-bottom__subtitle">Problem Statement</h3>
          <p className="event-details-bottom__txt">
            The healthcare industry faces challenges in delivering efficient,
            accurate, and scalable patient care. Current diagnostic tools, care
            systems, and health data management struggle with limitations in
            accessibility, accuracy, and timely response. AI-powered
            technologies have the potential to revolutionize these areas, but
            innovative solutions are needed to address specific gaps in
            diagnostics, patient care, and health data usage to improve
            outcomes.
          </p>
        </div>
        <div className="event-details-bottom__wrapper">
          <h3 className="event-details-bottom__subtitle">Objective/Goals</h3>
          <ul>
            <li>
              1. Innovate AI-powered solutions: Develop novel AI tools that
              enhance healthcare diagnostics and improve patient care.
            </li>
            <li>
              2. Optimize health data usage: Create systems to better manage,
              analyze, and utilize health data for clinical decision-making and
              improved patient outcomes.
            </li>
            <li>
              3. Collaborate effectively: Foster teamwork and cross-disciplinary
              collaboration to produce holistic, integrated solutions over the
              course of the hackathon.
            </li>
          </ul>
        </div>
        <div className="event-details-bottom__wrapper">
          <h3 className="event-details-bottom__subtitle">
            Constraints/Limitations
          </h3>
          <ul>
            <li>
              1. Scope limitation: Solutions should focus on specific healthcare
              challenges, such as diagnostics, patient care, or health data
              management, rather than attempting to address broad or multiple
              issues.
            </li>
            <li>
              2. Technical limitations: AI solutions need to consider data
              privacy regulations like HIPAA and should avoid violating patient
              confidentiality.
            </li>
          </ul>
        </div>
        <div className="event-details-bottom__wrapper">
          <h3 className="event-details-bottom__subtitle">
            Evaluation Criteria
          </h3>
          <ul>
            <li>
              1. Innovation and Creativity: The degree to which the solution
              introduces new or unique approaches to solving healthcare
              problems.
            </li>
            <li>
              2. Impact on Healthcare: How significantly the proposed solution
              improves diagnostics, patient care, or the use of health data.{" "}
            </li>
            <li>
              3. Technical Feasibility: The technical soundness and scalability
              of the AI solution in real-world healthcare settings.
            </li>
            <li>
              4. Presentation and Communication: Clarity and effectiveness in
              presenting the problem, solution, and its potential impact..{" "}
            </li>
          </ul>
        </div>
        <div className="event-details-bottom__wrapper">
          <h3 className="event-details-bottom__subtitle">
            Additional Information
          </h3>
          <p>
            Post-hackathon Support: Selected projects may be considered for
            continued development through partnerships with healthcare
            organizations or incubators.
          </p>
        </div>
      </section>
    </>
  );
}
