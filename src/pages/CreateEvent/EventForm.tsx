import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import "./EventForm.scss";
import { useNavigate } from "react-router-dom";
// import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";

interface EventFormInputs {
  title: string;
  organizer: string;
  description: string;
  skillLevel: string;
  disciplines: string;
  themes: string[];
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  meetingLink: string;
  minParticipants: number;
  maxParticipants: number;
  judges: string[];
  thumbnail: FileList;
}

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormInputs>({
    defaultValues: {
      title: "",
      organizer: "",
      description: "",
      skillLevel: "",
      disciplines: "",
      themes: [""],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      timezone: "",
      meetingLink: "",
      minParticipants: 0,
      maxParticipants: 0,
      judges: [""],
    },
  });

  const [judges, setJudges] = useState([{ firstName: "", lastName: "" }]);

  const handleJudgeChange = (
    index: number,
    value: string,
    field: "firstName" | "lastName"
  ) => {
    setJudges((prevJudges) => {
      const updatedJudges = [...prevJudges];
      updatedJudges[index] = { ...updatedJudges[index], [field]: value };
      return updatedJudges;
    });
  };

  const handleAddJudge = () => {
    if (judges.length < 4) {
      setJudges([...judges, { firstName: "", lastName: "" }]);
    }
  };

  const handleRemoveJudge = (index) => {
    if (judges.length > 1) {
      const updatedJudges = judges.filter((_, i) => i !== index);
      setJudges(updatedJudges);
    }
  };

  const [selectedThemes, setSelectedThemes] = useState([]);
  const allThemes = ["Healthcare", "Design", "AI", "Education", "Finance"];

  const [selectedDisiplines, setSelectedDisiplines] = useState([]);
  const allDisiplines = [
    "Design",
    "Data",
    "AI",
    "Development",
    "Multi-displine",
  ];

  const onSubmit = (data: EventFormInputs) => {
    console.log("Form Data", data);
    navigate("/ChallengeDetails");
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    if (value && selectedThemes.length < 3 && !selectedThemes.includes(value)) {
      setSelectedThemes([...selectedThemes, value]);
    } else if (selectedThemes.length >= 3) {
      alert("You can select up to 3 themes only.");
    }
  };

  const removeTheme = (theme) => {
    setSelectedThemes(selectedThemes.filter((t) => t !== theme));
  };

  const handleDisciplineChange = (e) => {
    const value = e.target.value;
    if (
      value &&
      selectedThemes.length < 3 &&
      !selectedDisiplines.includes(value)
    ) {
      setSelectedDisiplines([...selectedDisiplines, value]);
    } else if (selectedThemes.length >= 3) {
      alert("You can select up to 3 themes only.");
    }
  };

  const removeDisciplines = (disiplines) => {
    setSelectedDisiplines(selectedDisiplines.filter((t) => t !== disiplines));
  };

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/hackathons");
  };

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setFile(chosenFile);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="event-form">
      <section className="form-section">
        <h2>Create an Event</h2>
        <div className="steps">
          <div className="step active">1. Event Details</div>
          <div className="step">2. Challenge Details</div>
          <div className="step">3. Review</div>
        </div>
        <div className="form-group">
          <label htmlFor="title">Event Title *</label>
          <input
            {...register("title", { required: "Event Title is required" })}
            className={`form-control${errors.title ? "error" : ""}`}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label>Organized By *</label>
          <input
            {...register("organizer", { required: "Organizer is required" })}
          />
          {errors.organizer && (
            <p className="error">{errors.organizer.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Event Description *</label>
          <textarea
            {...register("description", {
              required: "Event description is required",
            })}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level *</label>
          <Controller
            name="skillLevel"
            control={control}
            rules={{ required: "Skill Level is required" }}
            render={({ field }) => (
              <>
                <div className="radio-group">
                  <label>
                    <input
                      {...field}
                      type="radio"
                      value="Beginner"
                      checked={field.value === "Beginner"}
                    />
                    Beginner
                  </label>

                  <label>
                    <input
                      {...field}
                      type="radio"
                      value="Intermediate"
                      checked={field.value === "Intermediate"}
                    />
                    Intermediate
                  </label>

                  <label>
                    <input
                      {...field}
                      type="radio"
                      value="Advanced"
                      checked={field.value === "Advanced"}
                    />
                    Advanced
                  </label>

                  <label>
                    <input
                      {...field}
                      type="radio"
                      value="Expert"
                      checked={field.value === "Expert"}
                    />
                    Expert
                  </label>
                </div>
              </>
            )}
          />
          {errors.skillLevel && (
            <p className="error">{errors.skillLevel.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="discipline">Discipline *</label>
          <div className="border-black border-2 rounded-lg border-solid flex gap-4 p-2 space-x-2">
            {selectedDisiplines.map((discipline) => (
              <div
                key={discipline}
                className="bg-yellow-400 flex items-center px-2 py-1 rounded-full"
              >
                {discipline}
                <button
                  onClick={() => removeDisciplines(discipline)}
                  className="ml-1 text-black"
                >
                  ✕
                </button>
              </div>
            ))}
            <select
              onChange={handleDisciplineChange}
              className="focus:outline-none w-full theme-select"
            >
              <option value="">Select up to 3 disiplines</option>
              {allDisiplines
                .filter(
                  (discipline) => !selectedDisiplines.includes(discipline)
                )
                .map((discipline) => (
                  <option key={discipline} value={discipline}>
                    {discipline}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="theme">Theme *</label>
          <div className="border-black border-2 rounded-lg border-solid flex gap-4 p-2 space-x-2">
            {selectedThemes.map((theme) => (
              <div
                key={theme}
                className="bg-yellow-400 flex items-center px-2 py-1 rounded-full"
              >
                {theme}
                <button
                  onClick={() => removeTheme(theme)}
                  className="ml-1 text-black"
                >
                  ✕
                </button>
              </div>
            ))}
            <select
              onChange={handleThemeChange}
              className="focus:outline-none w-full theme-select"
            >
              <option value="">Select up to 3 themes</option>
              {allThemes
                .filter((theme) => !selectedThemes.includes(theme))
                .map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="eventDuration">Event Duration *</label>

          <div className="sub-section">
            <span>Start *</span>
            <div className="date-input-container">
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    className={`form-control flex-1 ${
                      errors.startDate ? "error" : ""
                    }`}
                  />
                )}
              />
              <span className="divider">|</span>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <input
                    type="time"
                    {...field}
                    className={`form-control ${
                      errors.startTime ? "error" : ""
                    }`}
                  />
                )}
              />
            </div>

            {errors.startDate && (
              <p className="error">{errors.startDate.message}</p>
            )}
            {errors.startTime && (
              <p className="error">{errors.startTime.message}</p>
            )}
          </div>

          <div className="sub-section">
            <span>End *</span>
            <div className="date-input-container">
              <Controller
                name="endDate"
                control={control}
                rules={{ required: "End date is required" }}
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    className={`form-control ${
                      errors.startTime ? "error" : ""
                    }`}
                  />
                )}
              />
              <span className="divider">|</span>
              <Controller
                name="endTime"
                control={control}
                rules={{ required: "End time is required" }}
                render={({ field }) => (
                  <input
                    type="time"
                    {...field}
                    className={`form-control ${errors.endTime ? "error" : ""}`}
                  />
                )}
              />
            </div>
          </div>

          {/* Error messages */}
          {errors.endDate && <p className="error">{errors.endDate.message}</p>}
          {errors.endTime && <p className="error">{errors.endTime.message}</p>}
        </div>

        <div className="form-group">
          <label>Timezone *</label>
          <select
            {...register("timezone", { required: "Timezone is required" })}
            className={`form-control${errors.timezone ? " error" : ""}`}
          >
            <option value="">Select a timezone</option>
            <option value="GMT-0700">PST (GMT-0700)</option>
            <option value="GMT-0500">EST (GMT-0500)</option>
          </select>
          {errors.timezone && (
            <p className="error">{errors.timezone.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Meeting Link *</label>
          <input
            type="url"
            {...register("meetingLink", {
              required: "Meeting Link is required",
            })}
            className={`form-control${errors.meetingLink ? " error" : ""}`}
          />
          {errors.meetingLink && (
            <p className="error">{errors.meetingLink.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Participant Count *</label>
          <div className="flex flex-col">
            <label>Min</label>
            <input
              type="number"
              {...register("minParticipants", {
                valueAsNumber: true,
                required: "Minimum participant count is required",
                min: {
                  value: 1,
                  message: "Minimum participants must be at least 1",
                },
              })}
              placeholder="4"
              className={`w-2/12 p-1 rounded text-base ${
                errors.minParticipants ? "error" : ""
              }`}
            />
            {errors.minParticipants && (
              <p className="error">{errors.minParticipants.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>-</label>
            <label>Max</label>
            <input
              type="number"
              {...register("maxParticipants", {
                valueAsNumber: true,
                required: "Maximum participant count is required",
                min: {
                  value: 1,
                  message:
                    "Maximum participants must be greater than or equal to 1",
                },
              })}
              placeholder="100"
              className={`w-2/12 p-1 rounded text-base ${
                errors.maxParticipants ? "error" : ""
              }`}
            />
            {errors.maxParticipants && (
              <p className="error">{errors.maxParticipants.message}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="judges">Judges*</label>
          {judges.map((judge, index) => (
            <div
              key={index}
              className="judge-input-container flex items-center space-x-4 my-3"
            >
              <label className="mr-2">Judge #{index + 1}</label>
              <input
                type="text"
                value={judge.firstName}
                placeholder="Enter first name"
                onChange={(e) =>
                  handleJudgeChange(index, e.target.value, "firstName")
                }
                className="flex-1 p-2 w-6"
              />
              <input
                type="text"
                value={judge.lastName}
                placeholder="Enter last name"
                onChange={(e) =>
                  handleJudgeChange(index, e.target.value, "lastName")
                }
                className="flex-1 p-2 w-6"
              />
              {
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveJudge(index)}
                >
                  X
                </button>
              }
            </div>
          ))}
          {judges.length < 4 && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="px-4 py-2 add-judge-button"
                onClick={handleAddJudge}
              >
                Add Judge
              </button>
            </div>
          )}
        </div>

        <div className="file-upload-container">
          <label className="block font-bold text-lg mb-2">
            Upload a Thumbnail Image
          </label>
          <div className="text-center w-80">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:border-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm mb-2">
                drag and drop file or{" "}
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={handleFileClick}
                >
                  choose file
                </span>
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.svg,.zip"
              />
            </div>
            {file && <p className="mt-2 text-sm">Selected file: {file.name}</p>}

            <p className="text-xs text-black mb-1">
              supported formats: JPG, PNG, PDF, SVG, ZIP
            </p>
            <p className="text-xs text-black">maximum size: 10MB</p>
          </div>
        </div>
        <div className="form-navigation">
          <button
            type="button"
            className="btn cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="btn next">
            Next
          </button>
        </div>
      </section>
    </form>
  );
};

export default EventForm;
