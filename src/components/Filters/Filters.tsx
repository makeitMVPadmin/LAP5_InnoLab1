// import "./Filters.scss";

export default function Filters({ filters, onFilterChange }) {

  const filterLabels = "font-poppins text-sm"
  return (
    <>
      <section className="font-gilroy">
        <h4 className="font-gilroy">Skill-level</h4>
        <ul className="font-gilroy">
          <li>
            <input
              type="radio"
              id="beginner"
              name="skillLevel"
              value="beginner"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.skillLevel === "beginner"}
              onChange={onFilterChange}
            />
            <label htmlFor="beginner" className={`${filterLabels}`}>Beginner</label>
          </li>
          <li>
            <input
              type="radio"
              id="intermediate"
              name="skillLevel"
              value="intermediate"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.skillLevel === "intermediate"}
              onChange={onFilterChange}
            />
            <label htmlFor="intermediate" className={`${filterLabels}`}>Intermediate</label>
          </li>
          <li>
            <input
              type="radio"
              id="experienced"
              name="skillLevel"
              value="advanced"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.skillLevel === "advanced"}
              onChange={onFilterChange}
            />
            <label htmlFor="advanced" className={`${filterLabels}`}>Advanced</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="font-gilroy text-xl">Discipline</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="design"
              name="disciplines"
              value="design"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.discipline === "design"}
              onChange={onFilterChange}
            />
            <label htmlFor="design" className={`${filterLabels}`}>Design</label>
          </li>
          <li>
            <input
              type="radio"
              id="software-development"
              name="disciplines"
              value="software development"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.discipline === "software development"}
              onChange={onFilterChange}
            />
            <label htmlFor="software-development" className={`${filterLabels}`}>Software Development</label>
          </li>
          <li>
            <input
              type="radio"
              id="data-science"
              name="disciplines"
              value="data science and analytics"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.discipline === "data science and analytics"}
              onChange={onFilterChange}
            />
            <label htmlFor="data-science" className={`${filterLabels}`}>Data Science and Analytics</label>
          </li>
          <li>
            <input
              type="radio"
              id="web-development"
              name="disciplines"
              value="web development"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.discipline === "web development"}
              onChange={onFilterChange}
            />
            <label htmlFor="web-development" className={`${filterLabels}`}>Web Development</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="font-gilroy text-xl">Themes</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="sustainability-and-climate"
              name="themes"
              value="sustainability & climate"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.theme === "sustainability & climate"}
              onChange={onFilterChange}
            />
            <label htmlFor="sustainability-and-climate" className={`${filterLabels}`}>
              Sustainability & Climate
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="ai-and-machine-learning"
              name="themes"
              value="ai & machine learning"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.theme === "ai & machine learning"}
              onChange={onFilterChange}
            />
            <label htmlFor="ai-and-machine-learning" className={`${filterLabels}`}>
              AI & Machine Learning
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="health-and-wellness"
              name="themes"
              value="health & wellness"
              className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
              checked={filters.theme === "health & wellness"}
              onChange={onFilterChange}
            />
            <label htmlFor="health-and-wellness" className={`${filterLabels}`}>Health & Wellness</label>
          </li>
          <li>
            <input
              type="radio"
              id="fintech-and-blockchain"
              name="themes"
              value="fintech & blockchain"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.theme === "fintech & blockchain"}
              onChange={onFilterChange}
            />
            <label htmlFor="fintech-and-blockchain" className={`${filterLabels}`}>Fintech & Blockchain</label>
          </li>
          <li>
            <input
              type="radio"
              id="gaming-and-vr"
              name="themes"
              value="gaming & vr"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.theme === "gaming & vr"}
              onChange={onFilterChange}
            />
            <label htmlFor="gaming-and-vr" className={`${filterLabels}`}>Gaming & VR</label>
          </li>
          <li>
            <input
              type="radio"
              id="education-and-learning"
              name="themes"
              value="education & learning"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.theme === "education & learning"}
              onChange={onFilterChange}
            />
            <label htmlFor="education-and-learning" className={`${filterLabels}`}>Education & Learning</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="font-gilroy text-xl">Time-Zone</h4>
        <ul className="gap-4">
          <li>
            <input
              type="radio"
              id="est"
              name="timeZone"
              value="est"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.timeZone === "est"}
              onChange={onFilterChange}
            />
            <label htmlFor="est" className={`${filterLabels}`}>EST</label>
          </li>
          <li>
            <input
              type="radio"
              id="pst"
              name="timeZone"
              value="pst"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.timeZone === "pst"}
              onChange={onFilterChange}
            />
            <label htmlFor="pst" className={`${filterLabels}`}>PST</label>
          </li>
          <li>
            <input
              type="radio"
              id="cst"
              name="timeZone"
              value="cst"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.timeZone === "cst"}
              onChange={onFilterChange}
            />
            <label htmlFor="cst" className={`${filterLabels}`}>CST</label>
          </li>
          <li>
            <input
              type="radio"
              id="mst"
              name="timeZone"
              value="mst"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.timeZone === "mst"}
              onChange={onFilterChange}
            />
            <label htmlFor="mst" className={`${filterLabels}`}>MST</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="font-gilroy text-xl">Duration</h4>
        <ul>
          <li>
            <input
              type="radio"
              id="24-hours"
              name="duration"
              value="24 hours"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.duration === "24 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="24-hours" className={`${filterLabels}`}>24 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="48-hours"
              name="duration"
              value="48 hours"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.duration === "48 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="48-hours" className={`${filterLabels}`}>48 hours</label>
          </li>
          <li>
            <input
              type="radio"
              id="72-hours"
              name="duration"
              value="72 hours"
              className="h-5 w-5 text-blue-600 border-gray-300"
              checked={filters.duration === "72 hours"}
              onChange={onFilterChange}
            />
            <label htmlFor="72-hours" className={`${filterLabels}`}>72 hours</label>
          </li>
        </ul>
      </section>
    </>
  );
}
