import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"

export default function Filters({ filters, onFilterChange }) {
  // Helper function to convert checkbox change to expected event format
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    onFilterChange({
      target: { name, value, checked },
    } as any);
  };
  const subHeading = "font-gilroy text-lg"
  const filterLabel = "text-base font-poppins leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  const filterGroupedInput = "space-y-4"
  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <h4 className={`${subHeading}`}>Skill-level</h4>
        <div className={`${filterGroupedInput}`}>
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <div key={level} className="flex items-center space-x-4">
              <Checkbox
                id={level}
                className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-MVP-dark-blue"
                checked={filters.skillLevel?.includes(level)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("skillLevel", level, checked as boolean)
                }
              />
              <Label
                htmlFor={level}
                className={`${filterLabel}`}
              >
                {level}
              </Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h4 className={`${subHeading}`}>Discipline</h4>
        <div className={`${filterGroupedInput}`}>
          {[
            "Design",
            "Software Development",
            "Data Science and Analytics",
            "Web Development"
          ].map((discipline) => (
            <div key={discipline} className="flex items-center space-x-4">
              <Checkbox
                id={discipline}
                className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-MVP-dark-blue"
                checked={filters.disciplines?.includes(discipline)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("disciplines", discipline, checked as boolean)
                }
              />
              <Label
                htmlFor={discipline}
                className={`${filterLabel}`}
              >
                {discipline}
              </Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h4 className={`${subHeading}`}>Themes</h4>
        <div className={`${filterGroupedInput}`}>
          {[
            "Sustainability & Climate",
            "AI & Machine Learning",
            "Health & Wellness",
            "Fintech & Blockchain",
            "Gaming & VR",
            "Education & Learning"
          ].map((theme) => (
            <div key={theme} className="flex items-center space-x-4">
              <Checkbox
                id={theme}
                className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-MVP-dark-blue"
                checked={filters.themes?.includes(theme)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("themes", theme, checked as boolean)
                }
              />
              <Label
                htmlFor={theme}
                className={`${filterLabel}`}
              >
                {theme}
              </Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h4 className={`${subHeading}`}>Time-Zone</h4>
        <div className={`${filterGroupedInput}`}>
          {["EST", "PST", "CST", "MST"].map((timezone) => (
            <div key={timezone} className="flex items-center space-x-4">
              <Checkbox
                id={timezone}
                className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-MVP-dark-blue"
                checked={filters.timeZone?.includes(timezone)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("timeZone", timezone, checked as boolean)
                }
              />
              <Label
                htmlFor={timezone}
                className={`${filterLabel}`}
              >
                {timezone}
              </Label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h4 className={`${subHeading}`}>Duration</h4>
        <div className={`${filterGroupedInput}`}>
          {["24 hours", "48 hours", "72 hours"].map((duration) => (
            <div key={duration} className="flex items-center space-x-4">
              <Checkbox
                id={duration}
                className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-MVP-dark-blue"
                checked={filters.duration?.includes(duration)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("duration", duration, checked as boolean)
                }
              />
              <Label
                htmlFor={duration}
                className={`${filterLabel}`}
              >
                {duration}
              </Label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import "./Filters.scss";

export default function Filters({ filters, onFilterChange }) {
  return (
    <>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Skill-level</h4>
        <ul>
          <li>
            <input
              type="checkbox"
              id="Beginner"
              name="skillLevel"
              value="Beginner"
              className="event-page__input"
              checked={filters.skillLevel.includes("Beginner")}
              onChange={onFilterChange}
            />
            <label htmlFor="Beginner">Beginner</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Intermediate"
              name="skillLevel"
              value="Intermediate"
              className="event-page__input"
              checked={filters.skillLevel.includes("Intermediate")}
              onChange={onFilterChange}
            />
            <label htmlFor="Intermediate">Intermediate</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Advanced"
              name="skillLevel"
              value="Advanced"
              className="event-page__input"
              checked={filters.skillLevel.includes("Advanced")}
              onChange={onFilterChange}
            />
            <label htmlFor="Advanced">Advanced</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Discipline</h4>
        <ul>
          <li>
            <input
              type="checkbox"
              id="Design"
              name="disciplines"
              value="Design"
              className="event-page__input"
              checked={filters.disciplines.includes("Design")}
              onChange={onFilterChange}
            />
            <label htmlFor="Design">Design</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Software Development"
              name="disciplines"
              value="Software Development"
              className="event-page__input"
              checked={filters.disciplines.includes("Software Development")}
              onChange={onFilterChange}
            />
            <label htmlFor="Software Development">Software Development</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Data Science and Analytics"
              name="disciplines"
              value="Data Science and Analytics"
              className="event-page__input"
              checked={filters.disciplines.includes(
                "Data Science and Analytics"
              )}
              onChange={onFilterChange}
            />
            <label htmlFor="Data Science and Analytics">
              Data Science and Analytics
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Web Development"
              name="disciplines"
              value="Web Development"
              className="event-page__input"
              checked={filters.disciplines.includes("Web Development")}
              onChange={onFilterChange}
            />
            <label htmlFor="Web Development">Web Development</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Themes</h4>
        <ul>
          <li>
            <input
              type="checkbox"
              id="Sustainability & Climate"
              name="themes"
              value="Sustainability & Climate"
              className="event-page__input"
              checked={filters.themes.includes("Sustainability & Climate")}
              onChange={onFilterChange}
            />
            <label htmlFor="Sustainability & Climate">
              Sustainability & Climate
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="AI & Machine Learning"
              name="themes"
              value="AI & Machine Learning"
              className="event-page__input"
              checked={filters.themes.includes("AI & Machine Learning")}
              onChange={onFilterChange}
            />
            <label htmlFor="AI & Machine Learning">AI & Machine Learning</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Health & Wellness"
              name="themes"
              value="Health & Wellness"
              className="event-page__input"
              checked={filters.themes.includes("Health & Wellness")}
              onChange={onFilterChange}
            />
            <label htmlFor="Health & Wellness">Health & Wellness</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Fintech & Blockchain"
              name="themes"
              value="Fintech & Blockchain"
              className="event-page__input"
              checked={filters.themes.includes("Fintech & Blockchain")}
              onChange={onFilterChange}
            />
            <label htmlFor="Fintech & Blockchain">Fintech & Blockchain</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Gaming & VR"
              name="themes"
              value="Gaming & VR"
              className="event-page__input"
              checked={filters.themes.includes("Gaming & VR")}
              onChange={onFilterChange}
            />
            <label htmlFor="Gaming & VR">Gaming & VR</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Education & Learning"
              name="themes"
              value="Education & Learning"
              className="event-page__input"
              checked={filters.themes.includes("Education & Learning")}
              onChange={onFilterChange}
            />
            <label htmlFor="Education & Learning">Education & Learning</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Time-Zone</h4>
        <ul>
          <li>
            <input
              type="checkbox"
              id="EST"
              name="timeZone"
              value="EST"
              className="event-page__input"
              checked={filters.timeZone.includes("EST")}
              onChange={onFilterChange}
            />
            <label htmlFor="EST">EST</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="PST"
              name="timeZone"
              value="PST"
              className="event-page__input"
              checked={filters.timeZone.includes("PST")}
              onChange={onFilterChange}
            />
            <label htmlFor="PST">PST</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="CST"
              name="timeZone"
              value="CST"
              className="event-page__input"
              checked={filters.timeZone.includes("CST")}
              onChange={onFilterChange}
            />
            <label htmlFor="CST">CST</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="MST"
              name="timeZone"
              value="MST"
              className="event-page__input"
              checked={filters.timeZone.includes("MST")}
              onChange={onFilterChange}
            />
            <label htmlFor="MST">MST</label>
          </li>
        </ul>
      </section>
      <section className="event-page__section">
        <h4 className="event-page__subheading">Duration</h4>
        <ul>
          <li>
            <input
              type="checkbox"
              id="24-hours"
              name="duration"
              value="24 hours"
              className="event-page__input"
              checked={filters.duration.includes("24 hours")}
              onChange={onFilterChange}
            />
            <label htmlFor="24-hours">24 hours</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="48-hours"
              name="duration"
              value="48 hours"
              className="event-page__input"
              checked={filters.duration.includes("48 hours")}
              onChange={onFilterChange}
            />
            <label htmlFor="48-hours">48 hours</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="72-hours"
              name="duration"
              value="72 hours"
              className="event-page__input"
              checked={filters.duration.includes("72 hours")}
              onChange={onFilterChange}
            />
            <label htmlFor="72-hours">72 hours</label>
          </li>
        </ul>
      </section>
    </>
  );
}
