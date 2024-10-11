import "./Filters.scss";

export default function Filters({ filters, onFilterChange }) {
  return (
    <>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Skill-level</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="beginner"
              name="skillLevel"
              value="beginner"
              className="event-page__input"
              checked={filters.skillLevel === "Beginner"}
              onChange={onFilterChange}
            />
            <label htmlFor="beginner">Beginner</label>
          </li>
          <li>
            <input
              type="radio"
              id="intermediate"
              name="skillLevel"
              value="intermediate"
              className="event-page__input"
              checked={filters.skillLevel === "Intermediate"}
              onChange={onFilterChange}
            />
            <label htmlFor="intermediate">Intermediate</label>
          </li>
          <li>
            <input
              type="radio"
              id="experienced"
              name="skillLevel"
              value="advanced"
              className="event-page__input"
              checked={filters.skillLevel === "Advanced"}
              onChange={onFilterChange}
            />
            <label htmlFor="advanced">Advanced</label>
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
              name="disciplines"
              value="Design"
              className="event-page__input"
              checked={filters.discipline === "Design"}
              onChange={onFilterChange}
            />
            <label htmlFor="design">Design</label>
          </li>
          <li>
            <input
              type="radio"
              id="software-development"
              name="disciplines"
              value="Software Development"
              className="event-page__input"
              checked={filters.discipline === "Software Development"}
              onChange={onFilterChange}
            />
            <label htmlFor="software-development">Software Development</label>
          </li>
          <li>
            <input
              type="radio"
              id="data-science"
              name="disciplines"
              value="Data Science and Analytics"
              className="event-page__input"
              checked={filters.discipline === "Data Science and Analytics"}
              onChange={onFilterChange}
            />
            <label htmlFor="data-science">Data Science and Analytics</label>
          </li>
          <li>
            <input
              type="radio"
              id="web-development"
              name="disciplines"
              value="Web Development"
              className="event-page__input"
              checked={filters.discipline === "Web Development"}
              onChange={onFilterChange}
            />
            <label htmlFor="web-development">Web Development</label>
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
