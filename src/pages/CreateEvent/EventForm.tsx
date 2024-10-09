import { useForm, Controller } from "react-hook-form";
import "./EventForm.scss";
import { useNavigate } from "react-router-dom";

interface EventFormInputs {
  title: string;
  organizer: string;
  description: string;
  skillLevel: string;
  theme: string;
  startDate: string;
  endDate: string;
  announcementDate: string;
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
          <label>Event Duration *</label>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field }) => <input type="datetime-local" {...field} />}
          />
          {errors.startDate && (
            <p className="error">{errors.startDate.message}</p>
          )}
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "End date is required" }}
            render={({ field }) => <input type="datetime-local" {...field} />}
          />
          {errors.endDate && <p className="error">{errors.endDate.message}</p>}
        </div>

        <div className="form-group">
          <label>Event Announcement Publish Date *</label>
          <Controller
            name="announcementDate"
            control={control}
            render={({ field }) => <input type="datetime-local" {...field} />}
          />
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
          <label>Judges *</label>
          {/* Handle dynamically adding/removing judges */}
          <input {...register(`judges.0`)} placeholder="Judge Name" />
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
