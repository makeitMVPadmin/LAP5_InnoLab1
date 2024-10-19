import { ChangeEvent } from "react";
import { FilterPropsType } from "../../hooks/useFilterEvents";

const Filters = ({ filters, setFilters }: FilterPropsType) => {
  
  const filterLabels = "font-poppins text-sm";

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "disciplines" || name === "themes") {
      setFilters((prevFilters) => {
        const currentSelections = prevFilters[name];
        const newSelections = currentSelections.includes(value)
          ? currentSelections.filter((item) => item !== value)
          : [...currentSelections, value];

        return {
          ...prevFilters,
          [name]: newSelections,
        };
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name] === value ? "" : value,
      }));
    }
  };

  const clearFilter = (field: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: "",
    }));
  }
  
  return (
    <section className="font-gilroy" aria-labelledby="filters-heading">
      <h1 id="filters-heading" className="font-gilroy text-3xl">Filters</h1>
      <fieldset>
        <legend className="font-gilroy">Skill Level</legend>
        <ul className="font-gilroy mt-[0.5rem]">
          {["beginner", "intermediate", "experienced", "advanced"].map(level => (
            <li key={level}>
              <input
                type="radio"
                id={level}
                name="skillLevel"
                value={level}
                className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
                checked={filters.skillLevel === level}
                onChange={handleFilterChange}
              />
              <label htmlFor={level} className={filterLabels}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => clearFilter('skillLevel')} 
          className="text-MVP-gray text-sm ml-[1rem] mt-[0.5rem] mb-[1rem] font-light hover:underline"
          aria-label="Clear selected skill level"
        >
          Clear Skills
        </button>
      </fieldset>
      <fieldset>
        <legend className="font-gilroy">Disciplines</legend>
        <ul className="font-gilroy mt-[0.5rem] mb-[1rem]">
          {["design", "software development", "data science and analytics", "web development"].map(discipline => (
            <li key={discipline}>
              <input
                type="checkbox"
                id={discipline}
                name="disciplines"
                value={discipline}
                className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
                checked={filters.disciplines.includes(discipline)}
                onChange={handleFilterChange}
              />
              <label htmlFor={discipline} className={filterLabels}>
                {discipline.charAt(0).toUpperCase() + discipline.slice(1)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="font-gilroy">Themes</legend>
        <ul className="font-gilroy mt-[0.5rem] mb-[1rem]">
          {["sustainability & climate", "ai & machine learning", "health & wellness", "fintech & blockchain", "gaming & vr", "education & learning"].map(theme => (
            <li key={theme}>
              <input
                type="checkbox"
                id={theme}
                name="themes"
                value={theme}
                className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
                checked={filters.themes.includes(theme)}
                onChange={handleFilterChange}
              />
              <label htmlFor={theme} className={filterLabels}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="font-gilroy">Time Zone</legend>
        <ul className="font-gilroy mt-[0.5rem]">
          {["EST", "PST", "CST", "MST"].map(timezone => (
            <li key={timezone}>
              <input
                type="radio"
                id={timezone}
                name="timezone"
                value={timezone}
                className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
                checked={filters.timezone === timezone}
                onChange={handleFilterChange}
              />
              <label htmlFor={timezone} className={filterLabels}>
                {timezone.charAt(0).toUpperCase() + timezone.slice(1)}
              </label>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => clearFilter('timezone')}  
          className="text-MVP-gray text-sm ml-[1rem] mt-[0.5rem] mb-[1rem] font-light hover:underline"
          aria-label="Clear Timezone"
        >
          Clear Selected Time Zone
        </button>
      </fieldset>
      <fieldset>
        <legend className="font-gilroy">Event Duration</legend>
        <ul className="font-gilroy mt-[0.5rem]">
          {["Less than 24 hours", "24 to 48 hours", "48 to 72 hours"].map(duration => (
            <li key={duration}>
              <input
                type="radio"
                id={duration}
                name="duration"
                value={duration}
                className="h-5 w-5 text-blue-600 border-gray-300 font-gilroy"
                checked={filters.duration === duration}
                onChange={handleFilterChange}
              />
              <label htmlFor={duration} className={filterLabels}>
                {duration.charAt(0).toUpperCase() + duration.slice(1)}
              </label>
            </li>
          ))}
        </ul>
        <button 
          onClick={() => clearFilter('duration')} 
          className="text-MVP-gray text-sm ml-[1rem] mt-[0.5rem] mb-[1rem] font-light hover:underline"
          aria-label="Clear Duration"
        >
          Clear Selected Duration
        </button>
      </fieldset>
    </section>
  );
};

export default Filters;
