import "./Filters.scss";

export default function Filters() {
  return (
    <>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Skill-level</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="beginner"
              name="skill-level"
              value="beginner"
              className="event-page__input"
            />
            <label htmlFor="beginner">Beginner</label>
          </li>
          <li>
            <input
              type="radio"
              id="intermediate"
              name="skill-level"
              value="intermediate"
              className="event-page__input"
            />
            <label htmlFor="intermediate">Intermediate</label>
          </li>
          <li>
            <input
              type="radio"
              id="experienced"
              name="skill-level"
              value="experienced"
              className="event-page__input"
            />
            <label htmlFor="experienced">Experienced</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Discipline</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="design"
              name="discipline"
              value="design"
              className="event-page__input"
            />
            <label htmlFor="design">Design</label>
          </li>
          <li>
            <input
              type="radio"
              id="software-development"
              name="discipline"
              value="software-development"
              className="event-page__input"
            />
            <label htmlFor="software-development">Software Development</label>
          </li>
          <li>
            <input
              type="radio"
              id="multi-discipline"
              name="discipline"
              value="multi-discipline"
              className="event-page__input"
            />
            <label htmlFor="multi-discipline">Multi-Discipline</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Format</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="online"
              name="format"
              value="online"
              className="event-page__input"
            />
            <label htmlFor="online">Online</label>
          </li>
          <li>
            <input
              type="radio"
              id="in-person"
              name="format"
              value="in-person"
              className="event-page__input"
            />
            <label htmlFor="in-person">In Person</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Time-Zone</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="est"
              name="time-zone"
              value="est"
              className="event-page__input"
            />
            <label htmlFor="est">EST</label>
          </li>
          <li>
            <input
              type="radio"
              id="pst"
              name="time-zone"
              value="pst"
              className="event-page__input"
            />
            <label htmlFor="pst">PST</label>
          </li>
          <li>
            <input
              type="radio"
              id="gmt"
              name="time-zone"
              value="gmt"
              className="event-page__input"
            />
            <label htmlFor="gmt">GMT</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Duration</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="24-hours"
              name="duration"
              value="24-hours"
              className="event-page__input"
            />
            <label htmlFor="24-hours">24 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="48-hours"
              name="duration"
              value="48-hours"
              className="event-page__input"
            />
            <label htmlFor="48-hours">48 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="72-hours"
              name="duration"
              value="72-hours"
              className="event-page__input"
            />
            <label htmlFor="72-hours">72 hours</label>
          </li>
        </ul>
      </section>
    </>
  );
}
