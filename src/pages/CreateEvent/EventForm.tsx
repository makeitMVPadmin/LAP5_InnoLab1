import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { saveFormData, getFormData, clearFormData } from "./StorageUtils";
import { STYLES } from "../../constants/styles";
import { ReactComponent as CloseIcon } from "../../assets/images/closeIcon.svg";

const { styledBorder, sectionHeader } = STYLES;

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
  const savedData = getFormData("eventFormData");

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<EventFormInputs>({
    defaultValues: {
      title: savedData?.title || "",
      organizer: savedData?.organizer || "",
      description: savedData?.description || "",
      skillLevel: savedData?.skillLevel || "",
      disciplines: savedData?.disciplines || [],
      themes: savedData?.themes || [],
      startDate: savedData?.startDate || "",
      startTime: savedData?.startTime || "",
      endDate: savedData?.endDate || "",
      endTime: savedData?.endTime || "",
      timezone: savedData?.timezone || "",
      meetingLink: savedData?.meetingLink || "",
      minParticipants: savedData?.minParticipants || 0,
      maxParticipants: savedData?.maxParticipants || 0,
      judges: savedData?.judges || [{ firstName: "", lastName: "" }],
      thumbnail: savedData?.thumbnail || null,
    },
  });
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);

  useEffect(() => {
    if (savedData?.disciplines && savedData.disciplines.length > 0) {
      if (JSON.stringify(savedData.disciplines) !== JSON.stringify(selectedDisciplines)) {
        setSelectedDisciplines(savedData.disciplines);
      }
    }

    if (savedData?.themes && savedData.themes.length > 0) {
      if (JSON.stringify(savedData.themes) !== JSON.stringify(selectedThemes)) {
        setSelectedThemes(savedData.themes);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0 || errors.judges?.length > 0) {
      validateField("disciplines", selectedDisciplines);
      validateField("themes", selectedThemes);
    }
  }, [errors]);

  const watchedDisciplines = watch("disciplines");
  const watchedThemes = watch("themes");

  const navigate = useNavigate();
  const allThemes = ["AI & Machine Learning", "Sustainability & Climate", "Health & Wellness", "Fintech & Blockchain", "Education & Learning", "Gaming & VR"];
  const allDisciplines = ["Design", "Data Science and Analytics", "Software Development", "Web Development"];

  const validateField = (field, arrayValue) => {
    if (arrayValue.length === 0) {
      setError(field, {
        type: "manual",
        message: "At least one must be selected.",
      });
    } else {
      clearErrors(field);
    }

    return arrayValue.length !== 0;
  };

  const handleSelectionChange = (e, selectedArray, setSelected, validateField, setValue, fieldName) => {
    const value = e.target.value;
    if (value && !selectedArray.includes(value)) {
      const updatedSelection = [...selectedArray, value];
      setSelected(updatedSelection);
      validateField(fieldName, updatedSelection);
      setValue(fieldName, updatedSelection);
    }
  };

  const handleThemesChange = (e) => {
    handleSelectionChange(e, selectedThemes, setSelectedThemes, validateField, setValue, "themes");
  };

  const handleDisciplineChange = (e) => {
    handleSelectionChange(e, selectedDisciplines, setSelectedDisciplines, validateField, setValue, "disciplines");
  };

  const removeItem = (item, selectedArray, setSelected, validateField, setValue, fieldName) => {
    const updatedSelection = selectedArray.filter((i) => i !== item);
    setSelected(updatedSelection);
    validateField(fieldName, updatedSelection);
    setValue(fieldName, updatedSelection);
  };

  const removeTheme = (theme) => {
    removeItem(theme, selectedThemes, setSelectedThemes, validateField, setValue, "themes");
  };

  const removeDiscipline = (discipline) => {
    removeItem(discipline, selectedDisciplines, setSelectedDisciplines, validateField, setValue, "disciplines");
  };

  const handleCancelClick = () => {
    clearFormData("eventFormData");
    clearFormData("challengeDetailsData");
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

  const onSubmit = (data: EventFormInputs) => {
    const validTheme = validateField("themes", watchedThemes);
    const validDiscipline = validateField("disciplines", watchedDisciplines);
    if (!(validTheme || validDiscipline)) {
      return;
    }

    saveFormData("eventFormData", data);
    navigate("/ChallengeDetails");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "judges",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto py-[3.5rem] px-[1.5rem] rounded-lg font-gilroy">
      <section className="mb-[1.3rem]">
        <h2 className="font-bold text-[3rem] leading-[115.645%]">Create an Event</h2>
        <div className="flex gap-[2rem] my-[3.5rem] font-extrabold text-[1.2rem]">
          <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">1</div> Event Details</div>
          <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">2</div> Challenge Details</div>
          <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">3</div> Review</div>
        </div>
        <div className="py-[0.5rem] px-[1.6rem]">
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="event title" className={`${sectionHeader}`}>Event Title<span className="mb-2/3 text-[2rem]">*</span></label>
            <input
              {...register("title", { required: "Event Title is required", maxLength: 80 })}
              placeholder="Enter Event Title"
              maxLength={80}
              className={`${styledBorder} text-[1.2rem] flex items-center ${errors.title && "border-MVP-red"}`}
            />
            <div className="flex">
              {errors.title && (
                <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.title.message}</p>
              )}
              <p className="ml-auto font-bold">
                {watch("title")?.length || 0}/80 characters
              </p>
            </div>
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label className={`${sectionHeader}`}>Event Description<span className="mb-2/3 text-[2rem]">*</span></label>
            <textarea
              {...register("description", {
                required: "Event description is required",
                maxLength: 500
              })}
              placeholder="Enter any event descriptions"
              className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.description && "border-MVP-red"}`}
              maxLength={500}
            />
            <div className="flex">
              {errors.description && (
                <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.description.message}</p>
              )}
              <p className="ml-auto font-bold">
                {watch("description")?.length || 0}/500 characters
              </p>
            </div>
          </div>

          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="skillLevel" className={`${sectionHeader}`}>Skill Level<span className="mb-2/3 text-[2rem]">*</span></label>
            <Controller
              name="skillLevel"
              control={control}
              rules={{ required: "Skill Level is required" }}
              render={({ field }) => (
                <>
                  <div className="flex flex-row gap-[2.5rem] px-[1rem]">
                    <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] font-semibold">
                      <input
                        {...field}
                        className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] scale-150"
                        type="radio"
                        value="Beginner"
                        checked={field.value === "Beginner"}
                      />
                      Beginner
                    </label>

                    <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] font-semibold">
                      <input
                        {...field}
                        className="p-[0.6rem] border-[0.2rem] border-MVP-black rounded-[0.6rem] text-[0.9rem] scale-150"
                        type="radio"
                        value="Intermediate"
                        checked={field.value === "Intermediate"}
                      />
                      Intermediate
                    </label>

                    <label className="flex items-center gap-[0.8rem] text-[1.3rem] mb-[0.3rem] font-semibold">
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

          <div className="mb-[1rem] flex flex-col w-full">
            <label htmlFor="discipline" className={`${sectionHeader}`}>Discipline<span className="mb-2/3 text-[2rem]">*</span></label>
            <div className={`${styledBorder} gap-4 flex flex-wrap min-h-[50px] w-full items-center relative ${errors?.disciplines ? "border-red-500" : ""
              }`}>
              {selectedDisciplines.map((discipline) => (
                <div
                  key={discipline}
                  className={`rounded-full bg-MVP-yellow inline-flex items-center justify-between gap-4 h-10 px-6 py-3 font-semibold text-lg`}
                >
                  <p className="whitespace-nowrap">{discipline}</p>
                  <button
                    type="button"
                    onClick={() => removeDiscipline(discipline)}
                    className="hover:text-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="relative flex-1">
                <select
                  onChange={handleDisciplineChange}
                  className={`
                    w-full 
                    h-full
                    text-lg 
                    py-2 
                    px-4
                    bg-transparent
                    focus:outline-none
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${selectedDisciplines.length === 3 ? 'hidden' : 'cursor-pointer'}
                  `}
                  disabled={selectedDisciplines.length === 3}
                >
                  <option value="" className="py-2">
                    {selectedDisciplines.length === 0 ? 'Select up to 3 disciplines' : ''}
                  </option>
                  {allDisciplines
                    .filter((discipline) => !selectedDisciplines.includes(discipline))
                    .map((discipline) => (
                      <option
                        key={discipline}
                        value={discipline}
                        className="py-2"
                      >
                        {discipline}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {errors.disciplines && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.disciplines.message}
              </p>
            )}
          </div>

          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="theme" className={`${sectionHeader}`}>Theme<span className="mb-2/3 text-[2rem]">*</span></label>
            <div className={`${styledBorder} gap-4 flex flex-wrap min-h-[50px] w-full items-center relative ${errors?.themes ? "border-red-500" : ""
              }`}>
              {selectedThemes.map((theme) => (
                <div
                  key={theme}
                  className={`rounded-full bg-MVP-yellow inline-flex items-center justify-between gap-4 h-10 px-6 py-3 font-semibold text-lg`}
                >
                  <p>{theme}</p>
                  <button
                    type="button"
                    onClick={() => removeTheme(theme)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="relative flex-1">
                <select
                  onChange={handleThemesChange}
                  className={`
                    w-full
                    h-full
                    text-lg 
                    py-2 
                    px-4
                    bg-transparent
                    focus:outline-none
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${selectedThemes.length === 3 ? 'hidden' : 'cursor-pointer'}
                  `}
                  disabled={selectedThemes.length === 3}
                >
                  <option value={""}>{selectedThemes.length === 0 && 'Select up to 3 themes'}</option>
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
            {errors.themes && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.themes.message}</p>}
          </div>

          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="eventDuration" className={`${sectionHeader}`}>Event Duration<span className="mb-2/3 text-[2rem]">*</span></label>

            <div>
              <span className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>Start<span className="mb-2/3 text-[2rem]">*</span></span>
              <div className={`w-fit h-[3rem] !px-[1rem] !py-0 flex items-center justify-center gap-[1rem] ${styledBorder} hover:border-MVP-dark-blue ${(errors.startDate || errors.startTime) && "border-MVP-red"
                }`}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0 flex-1"
                    />
                  )}
                />
                <div className="border-l-[0.18rem] border-MVP-black h-[70%]" />
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: "Start time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className="bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0"
                    />
                  )}
                />
              </div>
              <div className="flex gap-[3rem]">
                {errors.startDate && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startDate.message}</p>}
                {errors.startTime && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startTime.message}</p>}
              </div>
            </div>

            <div>
              <label className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>End<span className="mb-2/3 text-[2rem]">*</span></label>
              <div className={`${styledBorder} w-fit h-[3rem] !px-[1rem] !py-0 flex items-center justify-center gap-[1rem] ${(errors.endDate || errors.endTime) && "border-MVP-red"
                }`}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="bg-transparent outline-none text-inherit cursor-pointer border-0"
                    />
                  )}
                />
                <div className="border-l-[0.18rem] border-MVP-black h-[70%]" />
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: "End time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className={`bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0 ${errors.endTime && "border-MVP-red"}`}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex gap-[3.5rem]">
              {errors.endDate && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.endDate.message}</p>}
              {errors.endTime && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.endTime.message}</p>}
            </div>
          </div>

          <div className="mb-[1rem] flex flex-col">
            <label className={`${sectionHeader}`}>Timezone<span className="mb-2/3 text-[2rem]">*</span></label>
            <div className={`${styledBorder} ${errors.timezone && "border-MVP-red"}`}>
              <select
                {...register("timezone", { required: "Timezone is required" })}
                className="text-[1.2rem] focus:outline-none w-full"
              >
                <option value="">Select a timezone</option>
                <option value="GMT-0700">PST (GMT-0700)</option>
                <option value="GMT-0600">MST (GMT-0600)</option>
                <option value="GMT-0600">CST (GMT-0600)</option>
                <option value="GMT-0500">EST (GMT-0500)</option>
              </select>
            </div>
            {errors.timezone && (
              <p className="text-MVP-red">{errors.timezone.message}</p>
            )}
          </div>

          <div className="mb-[1rem] flex flex-col">
            <label className={`${sectionHeader}`}>Meeting Link<span className="mb-2/3 text-[2rem]">*</span></label>
            <input
              type="url"
              {...register("meetingLink", {
                required: "Meeting Link is required",
                maxLength: 80
              })}
              placeholder="Enter meeting link"
              className={`${styledBorder} text-[1.2rem] flex items-center ${errors.meetingLink && "border-MVP-red"}`}
              maxLength={80}
            />
            <div className="flex">
              {errors.meetingLink && (
                <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.meetingLink.message}</p>
              )}
              <p className="ml-auto font-bold">
                {watch("description")?.length || 0}/80 characters
              </p>
            </div>
          </div>

          <div className="mb-[1rem]">
            <label className={`${sectionHeader}`}>Participant Count<span className="mb-2/3 text-[2rem]">*</span></label>
            <div className="flex items-center gap-4">
              <div className="flex-col">
                <label className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>Min</label>
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
                  className={`${styledBorder} w-[90px] h-[64px] text-[1.2rem] text-center ${errors.minParticipants && "border-MVP-red"
                    }`}
                />
                {errors.minParticipants && (
                  <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.minParticipants.message}</p>
                )}
              </div>
              <hr className="border-t-4 border-MVP-black w-4 mt-8" />
              <div className="flex-col">
                <label className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>Max</label>
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
                  className={`${styledBorder} w-[90px] h-[64px] text-[1.2rem] text-center ${errors.maxParticipants && "border-MVP-red"
                    }`}
                />
                {errors.maxParticipants && (
                  <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.maxParticipants.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-[3rem] flex-col">
            <label htmlFor="judges" className={`${sectionHeader}`}>Judges<span className="mb-2/3 text-[2rem]">*</span></label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex-col flex whitespace-nowrap my-5"
              >
                <div className={`w-full flex gap-[2rem] items-center justify-between`}>
                  <label className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>Judge #{index + 1}</label>
                  <div className="flex gap-[3rem] w-full">
                    <div className="flex-1">
                      <input
                        type="text"
                        {...register(`judges.${index}.firstName`, {
                          required: "First name is required",
                        })}
                        placeholder="Enter first name"
                        className={`${styledBorder} w-full text-[1.2rem] !px-[0.9rem] !py-[0.7rem] ${errors.judges?.[index]?.firstName && "border-MVP-red"
                          }`}
                      />
                      {errors.judges?.[index]?.firstName && (
                        <p className="text-MVP-red text-[0.8rem] mt-[0.2rem]">
                          {errors.judges[index].firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        {...register(`judges.${index}.lastName`, {
                          required: "Last name is required",
                        })}
                        placeholder="Enter last name"
                        className={`${styledBorder} w-full text-[1.2rem] !px-[0.9rem] !py-[0.7rem] ${errors.judges?.[index]?.lastName && "border-MVP-red"
                          }`}
                      />
                      {errors.judges?.[index]?.lastName && (
                        <p className="text-MVP-red text-[0.8rem] mt-[0.2rem]">
                          {errors.judges[index].lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <CloseIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {fields.length < 3 && (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className={`${styledBorder} !py-[0.6rem] bg-MVP-light-blue font-extrabold text-xl`}
                  onClick={() => append({ firstName: "", lastName: "" })}
                >
                  Add Judge
                </button>
              </div>
            )}
          </div>

          <div className="file-upload-container">
            <label className={`${sectionHeader} mb-[1rem]`}>
              Upload a Thumbnail Image
            </label>
            <div className="text-center font-extrabold w-[40%] text-xl">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col gap-2 items-center justify-center border-2 border-dashed border-MVP-black rounded-lg p-6 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="">
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

              <p className="my-2 text-sm ">
                supported formats: JPG, PNG, PDF, SVG, ZIP
              </p>
              <p className="text-sm">maximum size: 10MB</p>
            </div>
          </div>
          <div className="flex justify-end gap-[2rem] font-extrabold text-2xl">
            <button
              type="button"
              className={`${styledBorder} !py-[0.7rem] !px-[1.5rem]`}
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button type="submit" className={`${styledBorder} !bg-MVP-light-blue !py-[0.7rem] !px-[1.5rem]`}>
              Next
            </button>
          </div>
        </div>
      </section>
    </form >
  );
};


export default EventForm;