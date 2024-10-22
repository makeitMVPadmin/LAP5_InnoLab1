import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { saveFormData } from "./StorageUtils";

interface EventFormInputs {
  title: string;
  organizer: string;
  description: string;
  skillLevel: string;
  disciplines: string[];
  themes: string[];
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  meetingLink: string;
  minParticipants: number;
  maxParticipants: number;
  judges: { firstName: string; lastName: string }[];
  thumbnail: FileList;
}

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<EventFormInputs>({
    defaultValues: {
      title: "",
      organizer: "",
      description: "",
      skillLevel: "",
      disciplines: [],
      themes: [],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      timezone: "",
      meetingLink: "",
      minParticipants: 0,
      maxParticipants: 0,
      judges: [{ firstName: "", lastName: "" }],
      thumbnail: null,
    },
  });

  const navigate = useNavigate();
  const [selectedThemes, setSelectedThemes] = useState([]);
  const allThemes = ["AI & Machine Learning", "Sustainability & Climate", "Health & Wellness", "Fintech & Blockchain", "Education & Learning", "Gaming & VR"];

  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const allDisciplines = ["Design", "Data Science and Analytics", "Software Development", "Web Development"];

  const onSubmit = (data: EventFormInputs) => {
    saveFormData("eventFormData", data);
    navigate("/ChallengeDetails");
  };

  const handleThemesChange = (e) => {
    const value = e.target.value;
    if (
      value &&
      !selectedThemes.includes(value)
    ) {
      const updatedThemes = [...selectedThemes, value];
      setSelectedThemes(updatedThemes);
      setValue("themes", updatedThemes);
    };
  };


  const removeTheme = (theme) => {
    const updatedThemes = selectedThemes.filter((t) => t !== theme);
    setSelectedThemes(updatedThemes);
    setValue("themes", updatedThemes);
  };

  const handleDisciplineChange = (e) => {
    const value = e.target.value;
    if (
      value &&
      !selectedDisciplines.includes(value)
    ) {
      const updatedDisciplines = [...selectedDisciplines, value];
      setSelectedDisciplines(updatedDisciplines);
      setValue("disciplines", updatedDisciplines);
    };
  };

  const removeDiscipline = (discipline) => {
    const updatedDisciplines = selectedDisciplines.filter((d) => d !== discipline);
    setSelectedDisciplines(updatedDisciplines);
    setValue("disciplines", updatedDisciplines);
  };

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "judges",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto py-[3.5rem] px-[1.5rem] rounded-lg font-gilroy">
      <section className="mb-[1.3rem]">
        <h2 className="text-black font-bold text-[3rem] leading-[115.645%]">Create an Event</h2>
        <div className="flex gap-[1rem] my-[3.5rem]">
          <div className="flex flex-1 gap-[0.8rem] py-[0.6rem] justify-center items-center text-center text-[1.2rem] rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black bg-MVP-yellow text-MVP-black font-extrabold"><div className="justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">1</div> Event Details</div>
          <div className="flex flex-1 gap-[0.8rem] py-[0.6rem] justify-center items-center text-center text-[1.2rem] rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black font-extrabold"><div className="justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">2</div> Challenge Details</div>
          <div className="flex flex-1 gap-[0.8rem] py-[0.6rem] justify-center items-center text-center text-[1.2rem] rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black font-extrabold"><div className="justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">3</div> Review</div>
        </div>
        <div className="py-[0.5rem] px-[2rem]">
        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="event title" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Event Title<span className="mb-2/3 text-[2rem]">*</span></label>
          <input
            {...register("title", { required: "Event Title is required" })}
            placeholder="Enter Event Title" 
            className={`form-control p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[1.2rem] flex py-[1.3rem] pl-[1.3rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${errors.title && "text-MVP-red" }`}
          />
          {errors.title && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.title.message}</p>}
        </div>
        <div className="mb-[1rem] flex flex-col">
          <label className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Event Description<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("description", {
              required: "Event description is required",
            })}
            placeholder="Enter any event descriptions"
            className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[1.2rem] resize-vertical flex py-[1.3rem] pl-[1.3rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black"
          />
          {errors.description && (
            <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="skillLevel" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Skill Level<span className="mb-2/3 text-[2rem]">*</span></label>
          <Controller
            name="skillLevel"
            control={control}
            rules={{ required: "Skill Level is required" }}
            render={({ field }) => (
              <>
                <div className="flex flex-row gap-[2.5rem] px-[1rem]">
                  <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] text-MVP-black font-semibold">
                    <input
                      {...field}
                      className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] scale-150"
                      type="radio"
                      value="Beginner"
                      checked={field.value === "Beginner"}
                    />
                    Beginner
                  </label>

                  <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] text-MVP-black font-semibold">
                    <input
                      {...field}
                      className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] scale-150"
                      type="radio"
                      value="Intermediate"
                      checked={field.value === "Intermediate"}
                    />
                    Intermediate
                  </label>

                  <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] text-MVP-black font-semibold">
                    <input
                      {...field}
                      className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] scale-150"
                      type="radio"
                      value="Advanced"
                      checked={field.value === "Advanced"}
                    />
                    Advanced
                  </label>
                </div>
              </>
            )}
          />
          {errors.skillLevel && (
            <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.skillLevel.message}</p>
          )}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="discipline" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Discipline<span className="mb-2/3 text-[2rem]">*</span></label>
          <div
            className={`border-2 rounded-lg p-2 flex gap-4 flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
              errors.disciplines ? "border-red-500" : "border-black"
            }`}
          >
            {selectedDisciplines.map((discipline) => (
              <div
                key={discipline}
                className="bg-yellow-400 flex items-center px-6 py-1 rounded-full leading-[115.645%]"
              >
                {discipline}
                <button
                  type="button"
                  onClick={() => removeDiscipline(discipline)}
                  className="ml-4 text-black"
                >
                  ✕
                </button>
              </div>
            ))}
            <select
              onChange={handleDisciplineChange}
              className={`focus:outline-none w-full text-[1.2rem] ${selectedDisciplines.length === 3 && 'appearance-none'}`}
              disabled={selectedDisciplines.length === 3}
            >
              <option value={""}>{selectedDisciplines.length == 0 && 'Select up to 3 disciplines'}</option>
              {allDisciplines
                .filter(
                  (discipline) => !selectedDisciplines.includes(discipline)
                )
                .map((discipline) => (
                  <option key={discipline} value={discipline}>
                    {discipline}
                  </option>
                ))}
            </select>
          </div>
          {errors.disciplines && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.disciplines.message}
            </p>
          )}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="theme" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Theme<span className="mb-2/3 text-[2rem]">*</span></label>
          <div
            className={`flex gap-4 py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
              errors.disciplines ? "border-red-500" : "border-black"
            }`}
          >
            {selectedThemes.map((theme) => (
              <div
                key={theme}
                className="bg-yellow-400 flex items-center px-6 py-1 rounded-full leading-[115.645%]"
              >
                {theme}
                <button
                  onClick={() => removeTheme(theme)}
                  className="ml-4 text-black"
                >
                  ✕
                </button>
              </div>
            ))}
             <select
              onChange={handleThemesChange}
              className={`focus:outline-none w-full text-[1.2rem] ${selectedThemes.length === 3 && 'appearance-none'}`}
              disabled={selectedThemes.length === 3}
            >
              <option value={""}>{selectedThemes.length == 0 && 'Select up to 3 themes'}</option>
              {allThemes
                .filter((theme) => !selectedThemes.includes(theme))
                .map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
            </select>
          </div>
          {errors.themes && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.themes.message}</p>}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="eventDuration" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Event Duration<span className="mb-2/3 text-[2rem]">*</span></label>

          <div className="sub-section">
            <span className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Start<span className="mb-2/3 text-[2rem]">*</span></span>
            <div className="w-fit h-[3rem] px-[1rem] flex items-center justify-center gap-[1rem] rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black hover:border-MVP-dark-blue">
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    className={`form-control bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0 flex-1 ${
                      errors.startDate && "text-MVP-red"
                    }`}
                  />
                )}
              />
              <div className="border-l-[0.18rem] border-MVP-black h-[70%]"/>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <input
                    type="time"
                    {...field}
                    className={`form-control bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0 ${
                      errors.startTime && "text-MVP-red"
                    }`}
                  />
                )}
              />
            </div>

            {errors.startDate && (
              <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startDate.message}</p>
            )}
            {errors.startTime && (
              <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">End<span className="mb-2/3 text-[2rem]">*</span></label>
            <div className="w-fit h-[3rem] px-[1rem] flex items-center justify-center gap-[1rem] rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black hover:border-MVP-dark-blue">
              <Controller
                name="endDate"
                control={control}
                rules={{ required: "End date is required" }}
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    className={`form-control bg-transparent outline-none text-inherit cursor-pointer border-0 ${
                      errors.startTime && "text-MVP-red"
                    }`}
                  />
                )}
              />
              <div className="border-l-[0.18rem] border-MVP-black h-[70%]"/>
              <Controller
                name="endTime"
                control={control}
                rules={{ required: "End time is required" }}
                render={({ field }) => (
                  <input
                    type="time"
                    {...field}
                    className={`form-control bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0 ${errors.endTime && "text-MVP-red text-[0.8rem] mt-[0.3rem]"}`}
                  />
                )}
              />
            </div>
          </div>

          {/* Error messages */}
          {errors.endDate && <p className="text-MVP-red">{errors.endDate.message}</p>}
          {errors.endTime && <p className="text-MVP-red">{errors.endTime.message}</p>}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Timezone<span className="mb-2/3 text-[2rem]">*</span></label>
          <div className="rounded-[0.6rem] py-[1.3rem] px-[1rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black">
          <select
            {...register("timezone", { required: "Timezone is required" })}
            className={`text-[1.2rem] focus:outline-none w-full ${errors.timezone && "text-MVP-red"}`}
          >
            <option value="">Select a timezone</option>
            <option value="GMT-0700">PST (GMT-0700)</option>
            <option value="GMT-0600">MST (GMT-0600)</option>
            <option value="GMT-0600">CST (GMT-0600)</option>
            <option value="GMT-0500">EST (GMT-0500)</option>
          </select>
          {errors.timezone && (
            <p className="text-MVP-red">{errors.timezone.message}</p>
          )}
        </div>
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Meeting Link<span className="mb-2/3 text-[2rem]">*</span></label>
          <input
            type="url"
            {...register("meetingLink", {
              required: "Meeting Link is required",
            })}
            placeholder="Enter meeting link"
            className={`p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[1.2rem] flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${errors.meetingLink && "text-MVP-red text-[0.8rem] mt-[0.3rem]"}`}
          />
          {errors.meetingLink && (
            <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.meetingLink.message}</p>
          )}
        </div>

        <div className="mb-[1rem] flex flex-col">
          <label className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Participant Count<span className="mb-2/3 text-[2rem]">*</span></label>
          <div className="flex">
            <div className="flex flex-col">
              <label className="flex items-center text-MVP-black">Min</label>
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
                className={`w-fit rounded-[0.6rem] text-[0.9rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
                  errors.minParticipants && "text-MVP-red"
                }`}
              />
              {errors.minParticipants && (
                <p className="text-MVP-red">{errors.minParticipants.message}</p>
              )}
            </div>
            <p className="flex items-center text-[1rem] text-MVP-black">-</p>
            <div className="flex flex-col">
              <label className="flex items-center text-MVP-black">Max</label>
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
                className={`text-base rounded-[0.6rem] text-[0.9rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
                  errors.maxParticipants && "text-MVP-red"
                }`}
              />
              {errors.maxParticipants && (
                <p className="text-MVP-red">{errors.maxParticipants.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-[1rem] flex-col">
          <label htmlFor="judges" className="flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">Judges<span className="mb-2/3 text-[2rem]">*</span></label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="justify-between flex-col flex whitespace-nowrap my-3"
            >
              <div className="flex gap-2 items-center">
                <label className="flex items-center gap-[0.5rem] mb-[0.3rem] text-MVP-black">Judge #{index + 1}</label>
                <input
                  type="text"
                  {...register(`judges.${index}.firstName`, {
                    required: "First name is required",
                  })}
                  placeholder="Enter first name"
                  className={`w-3/6 mt-2 mb-1 p-2 border border-black rounded p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
                    errors.judges?.[index]?.firstName && "text-MVP-red text-[0.8rem] mt-[0.3rem]"
                  }`}
                />

                <input
                  type="text"
                  {...register(`judges.${index}.lastName`, {
                    required: "Last name is required",
                  })}
                  placeholder="Enter last name"
                  className={`w-3/6 mt-2 mb-1 p-2 border border-black rounded p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black ${
                    errors.judges?.[index]?.lastName && "text-MVP-red text-[0.8rem] mt-[0.3rem]"
                  }`}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="ml-4 text-red-500"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                )}
              </div>

              <div className="flex flex-col">
                {errors.judges?.[index]?.firstName && (
                  <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">
                    {errors.judges[index].firstName.message}
                  </p>
                )}
                {errors.judges?.[index]?.lastName && (
                  <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">
                    {errors.judges[index].lastName.message}
                  </p>
                )}
              </div>
            </div>
          ))}

        {fields.length <3 && (
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-[10px] bg-MVP-light-blue border-[3px] border-r-[5px] border-b-[5px] border-MVP-black text-MVP-black"
              onClick={() => append({ firstName: "", lastName: "" })}
            >
              Add Judge
            </button>
          </div>
        )}
        </div>

        <div className="file-upload-container">
          <label className="block font-bold text-lg mb-2 flex items-center gap-[0.2rem] mb-[0.3rem] text-MVP-black text-[1.6rem] font-extrabold">
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
        <div className="flex justify-end gap-[1rem]">
          <button
            type="button"
            className="px-[0.6rem] py-[1rem] text-MVP-black border-[0.3rem] border-MVP-black cursor-pointer hover:bg-MVP-dark-blue flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className="px-[0.6rem] py-[1rem] text-MVP-black border-[0.3rem] border-MVP-black cursor-pointer hover:bg-MVP-dark-blue bg-MVP-light-blue flex py-[1.3rem] px-[1rem] items-center self-stretch rounded-[0.6rem] border-t-[0.2rem] border-l-[0.2rem] border-b-[0.3rem] border-r-[0.3rem] border-MVP-black">
            Next
          </button>
        </div>
        </div>
      </section>
    </form>
  );
};


export default EventForm;
