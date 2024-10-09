import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import "./EventForm.scss";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";

interface EventFormInputs {
  title: string;
  organizer: string;
  description: string;
  skillLevel: string;
  theme: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  announcementDate: string;
  announcementTime: string;
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
      judges: [""],
    },
  });

  const [judges, setJudges] = useState([{ name: "" }]);

  const handleJudgeChange = (index, value) => {
    const updatedJudges = [...judges];
    updatedJudges[index].name = value;
    setJudges(updatedJudges);
  };

  const handleAddJudge = () => {
    if (judges.length < 4) {
      setJudges([...judges, { name: "" }]);
    }
  };

  const handleRemoveJudge = (index) => {
    if (judges.length > 1) {
      const updatedJudges = judges.filter((_, i) => i !== index);
      setJudges(updatedJudges);
    }
  };

  const onSubmit = (data: EventFormInputs) => {
    console.log("Form Data", data);
  };

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/hackathons");
  };

  const handleNextClick = () => {
    navigate("/ChallengeDetails");
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
          <label>Event Title *</label>
          <input
            {...register("title", { required: "Event Title is required" })}
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
            <p className="error-text">{errors.skillLevel.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Theme *</label>
          <select
            {...register("theme", { required: "Select at least one theme" })}
          >
            <option value="AI">AI</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Design">Design</option>
          </select>
          {errors.theme && <p className="error">{errors.theme.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="eventDuration">Event Duration*</label>

          <div className="sub-section">
            <span>Start *</span>
            <div className="date-time-container">
              <div className="date-input">
                <CalendarIcon className="icon" />
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className={`form-control ${
                        errors.startDate ? "error" : ""
                      }`}
                    />
                  )}
                />
              </div>

              <div className="time-input">
                <ClockIcon className="icon" />
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
            </div>
          </div>

          <div className="sub-section">
            <span>End *</span>
            <div className="date-time-container">
              <div className="date-input">
                <CalendarIcon className="icon" />
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className={`form-control ${
                        errors.endDate ? "error" : ""
                      }`}
                    />
                  )}
                />
              </div>

              <div className="time-input">
                <ClockIcon className="icon" />
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: "End time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className={`form-control ${
                        errors.endTime ? "error" : ""
                      }`}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Error messages */}
          {errors.startDate && (
            <p className="error-text">{errors.startDate.message}</p>
          )}
          {errors.startTime && (
            <p className="error-text">{errors.startTime.message}</p>
          )}
          {errors.endDate && (
            <p className="error-text">{errors.endDate.message}</p>
          )}
          {errors.endTime && (
            <p className="error-text">{errors.endTime.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="announcementDate">
            Event Announcement Publish Date*
          </label>
          <div className="date-input-container">
            <CalendarIcon className="icon" />
            <Controller
              name="announcementDate"
              control={control}
              rules={{ required: "Announcement date is required" }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className={`form-control ${
                    errors.announcementDate ? "error" : ""
                  }`}
                />
              )}
            />
            <span className="divider">|</span>
            <ClockIcon className="icon" />
            <Controller
              name="announcementTime"
              control={control}
              rules={{ required: "Announcement time is required" }}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  className={`form-control ${
                    errors.announcementTime ? "error" : ""
                  }`}
                />
              )}
            />
          </div>
          {errors.announcementDate && (
            <p className="error-text">{errors.announcementDate.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Timezone</label>
          <select
            {...register("timezone", { required: "Timezone is required" })}
          >
            <option value="GMT-0700">PST (GMT-0700)</option>
            <option value="GMT-0500">EST (GMT-0500)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Meeting Link *</label>
          <input type="url" {...register("meetingLink")} />
        </div>

        <div className="form-group">
          <label>Participant Count *</label>
          <input
            type="number"
            {...register("minParticipants", { valueAsNumber: true })}
            placeholder="Min"
          />{" "}
          -
          <input
            type="number"
            {...register("maxParticipants", { valueAsNumber: true })}
            placeholder="Max"
          />
        </div>

        <div className="form-group">
          <label htmlFor="judges">Judges*</label>
          {judges.map((judge, index) => (
            <div key={index} className="judge-input-container">
              <label>Judge #{index + 1}</label>
              <input
                type="text"
                value={judge.name}
                placeholder="Enter judge name"
                onChange={(e) => handleJudgeChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-judge-button"
                  onClick={() => handleRemoveJudge(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          {judges.length < 4 && (
            <button
              type="button"
              className="add-judge-button"
              onClick={handleAddJudge}
            >
              Add Judge
            </button>
          )}
        </div>

        <div className="form-group">
          <label>Upload a Thumbnail Image</label>
          <input type="file" {...register("thumbnail")} />
        </div>
        <div className="form-navigation">
          <button
            type="button"
            className="btn cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="button" className="btn next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </section>
    </form>
  );
};

export default EventForm;
