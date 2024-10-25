import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"

export default function Filters({ filters, onFilterChange }) {
  // Helper function to convert checkbox change to expected event format
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    onFilterChange({
      target: { name, value, checked },
    } as any);
  };
  const subHeading = "font-gilroy text-lg font-bold"
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
