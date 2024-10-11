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
              value="design"
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
              value="software development"
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
              value="data science and analytics"
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
              value="web development"
              className="event-page__input"
              checked={filters.discipline === "Web Development"}
              onChange={onFilterChange}
            />
            <label htmlFor="web-development">Web Development</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Themes</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="sustainability-and-climate"
              name="themes"
              value="sustainability & climate"
              className="event-page__input"
              checked={filters.theme === "Sustainability & Climate"}
              onChange={onFilterChange}
            />
            <label htmlFor="sustainability-and-climate">
              Sustainability & Climate
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="ai-and-machine-learning"
              name="themes"
              value="ai & machine learning"
              className="event-page__input"
              checked={filters.theme === "AI & Machine Learning"}
              onChange={onFilterChange}
            />
            <label htmlFor="ai-and-machine-learning">
              AI & Machine Learning
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="health-and-wellness"
              name="themes"
              value="health & wellness"
              className="event-page__input"
              checked={filters.theme === "Health & Wellness"}
              onChange={onFilterChange}
            />
            <label htmlFor="health-and-wellness">Health & Wellness</label>
          </li>
          <li>
            <input
              type="radio"
              id="fintech-and-blockchain"
              name="themes"
              value="fintech & blockchain"
              className="event-page__input"
              checked={filters.theme === "Fintech & Blockchain"}
              onChange={onFilterChange}
            />
            <label htmlFor="fintech-and-blockchain">Fintech & Blockchain</label>
          </li>
          <li>
            <input
              type="radio"
              id="gaming-and-vr"
              name="themes"
              value="gaming & vr"
              className="event-page__input"
              checked={filters.theme === "Gaming & VR"}
              onChange={onFilterChange}
            />
            <label htmlFor="gaming-and-vr">Gaming & VR</label>
          </li>
          <li>
            <input
              type="radio"
              id="education-and-learning"
              name="themes"
              value="education & learning"
              className="event-page__input"
              checked={filters.theme === "Education & Learning"}
              onChange={onFilterChange}
            />
            <label htmlFor="education-and-learning">Education & Learning</label>
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
              name="timeZone"
              value="est"
              className="event-page__input"
              checked={filters.timeZone === "EST"}
              onChange={onFilterChange}
            />
            <label htmlFor="est">EST</label>
          </li>
          <li>
            <input
              type="radio"
              id="pst"
              name="timeZone"
              value="pst"
              className="event-page__input"
              checked={filters.timeZone === "PST"}
              onChange={onFilterChange}
            />
            <label htmlFor="pst">PST</label>
          </li>
          <li>
            <input
              type="radio"
              id="cst"
              name="timeZone"
              value="cst"
              className="event-page__input"
              checked={filters.timeZone === "CST"}
              onChange={onFilterChange}
            />
            <label htmlFor="cst">CST</label>
          </li>
          <li>
            <input
              type="radio"
              id="mst"
              name="timeZone"
              value="mst"
              className="event-page__input"
              checked={filters.timeZone === "MST"}
              onChange={onFilterChange}
            />
            <label htmlFor="mst">MST</label>
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
              value="24 hours"
              className="event-page__input"
              checked={filters.duration === "24 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="24-hours">24 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="48-hours"
              name="duration"
              value="48 hours"
              className="event-page__input"
              checked={filters.duration === "48 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="48-hours">48 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="72-hours"
              name="duration"
              value="72 hours"
              className="event-page__input"
              checked={filters.duration === "72 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="72-hours">72 hours</label>
          </li>
        </ul>
      </section>
    </>
  );
}
