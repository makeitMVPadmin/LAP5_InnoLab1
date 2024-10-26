import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { saveFormData, getFormData, clearFormData } from "./StorageUtils";
import { STYLES } from "../../constants/styles";
import { useFetchHackathonUser } from "../../Firebase/FirebaseQueries";
import { auth } from "../../Firebase/FirebaseConfig";
import { ReactComponent as CloseIcon } from "../../assets/images/closeIcon.svg";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import FileUploadZone from "../../components/FileUploadZone/FileUploadZone";
import ImportCard from "../../components/ImportCard/ImportCard";
import ErrorIcon from "../../assets/images/error.svg"

const { styledBorder, sectionHeader } = STYLES;

interface EventFormInputs {
  title: string;
  organizer: string;
  basicProjectSummary: string;
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
  imageUrl: string[];
  file: File;
}

const EventForm: React.FC = () => {
  const { hackathonUser } = useFetchHackathonUser(auth.currentUser?.uid);
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
    getValues,
  } = useForm<EventFormInputs>({
    defaultValues: {
      title: savedData?.title || "",
      organizer: savedData?.organizer || "",
      basicProjectSummary: savedData?.basicProjectSummary || "",
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
      imageUrl: savedData?.imageUrl || null,
      file: null,
    },
  });

  useEffect(() => {
    setValue("minParticipants", 1);
    setValue("maxParticipants", 2);
  }, []);

  useEffect(() => {
    if (hackathonUser) {
      setValue("organizer", hackathonUser.fullName);
    }
  }, [hackathonUser]);

  useEffect(() => {
    if (savedData?.disciplines && savedData.disciplines.length > 0) {
      setValue("disciplines", savedData.disciplines)
    }

    if (savedData?.themes && savedData.themes.length > 0) {
      setValue("themes", savedData.themes)
    }
  }, []);

  const navigate = useNavigate();
  const allThemes = [
    "AI & Machine Learning",
    "Sustainability & Climate",
    "Health & Wellness",
    "Fintech & Blockchain",
    "Education & Learning",
    "Gaming & VR",
  ];
  const allDisciplines = [
    "Design",
    "Data Science and Analytics",
    "Software Development",
    "Web Development",
  ];

  const validateField = (field, array) => {
    if (array.length === 0) {
      setError(field, {
        type: "manual",
        message: "At least one must be selected.",
      });
    } else {
      clearErrors(field);
    }
  };

  const addItem = (e, fieldName) => {
    const value = e.target.value;
    const selectedArray = getValues(fieldName)
    if (value && !selectedArray.includes(value)) {
      const updatedSelection = [...selectedArray, value];
      setValue(fieldName, updatedSelection);
      validateField(fieldName, updatedSelection);
    }
  };

  const addTheme = (e) => { addItem(e, "themes") };

  const addDiscipline = (e) => { addItem(e, "disciplines") };

  const removeItem = (item, fieldName) => {
    const selectedArray = getValues(fieldName);
    const updatedSelection = selectedArray.filter((i) => i !== item);
    validateField(fieldName, updatedSelection);
    setValue(fieldName, updatedSelection);
  };

  const removeTheme = (theme) => { removeItem(theme, "themes") };
  const removeDiscipline = (discipline) => { removeItem(discipline, "disciplines") };

  const handleCancelClick = () => {
    clearFormData("eventFormData");
    clearFormData("challengeDetailsData");
    navigate("/hackathons");
  };

  const [file, setFile] = useState(null);

  const handleDeleteFile = (indexToRemove) => {
    const newFiles = file.filter((_, index) => index !== indexToRemove);
    setFile(newFiles)
  }

  const handleFileChange = (chosenFile: File) => {
    setFile(chosenFile);
    setValue('file', chosenFile)
  };

  const onSubmit = (data: EventFormInputs) => {
    console.log(data)
    const startDate = getValues("startDate");
    saveFormData("eventFormData", data);
    navigate("/ChallengeDetails", { state: { startDate } });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "judges",
  });

  const handleFormValidation = (e) => {
    e.preventDefault();
    validateField("disciplines", getValues("disciplines"));
    validateField("themes", getValues("themes"))
    handleSubmit(onSubmit)();
  };

  return (
    <form
      onSubmit={handleFormValidation}
      className="w-2/3 mx-auto py-[3.5rem] px-[1.5rem] rounded-lg font-gilroy"
    >
      <section className="mb-[1.3rem]">
        <h2 className="font-bold text-[3rem] leading-[115.645%]">
          Create an Event
        </h2>
        <div className="flex gap-[2rem] my-[3.5rem] font-extrabold text-[1.2rem]">
          <div
            className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center 
                        items-center text-center bg-MVP-yellow`}
          >
            <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
              1
            </div>
            {" "}Event Details
          </div>
          <div
            className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}
          >
            <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
              2
            </div>{" "}Challenge Details
          </div>
          <div
            className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}
          >
            <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
              3
            </div>{" "}Review
          </div>
        </div>
        <div className="py-[0.5rem] px-[1.6rem]">
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="event title" className={`${sectionHeader}`}>
              Event Title<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <input
              {...register("title", {
                required: "Event Title is required",
                maxLength: 80,
              })}
              placeholder="Enter Event Title"
              maxLength={80}
              className={`${styledBorder} text-[1.2rem] flex items-center ${errors.title && "border-MVP-red"
                }`}
            />
            <div className="flex">
              {errors.title && (
                <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                  {errors.title.message}
                </p>
              )}
              <p className="ml-auto font-bold">
                {watch("title")?.length || 0}/80 characters
              </p>
            </div>
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label className={`${sectionHeader}`}>
              Event Description<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <textarea
              {...register("basicProjectSummary", {
                required: "Event description is required",
                maxLength: 500,
              })}
              placeholder="Enter any event descriptions"
              className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.basicProjectSummary && "border-MVP-red"
                }`}
              maxLength={500}
            />
            <div className="flex">
              {errors.basicProjectSummary && (
                <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                  {errors.basicProjectSummary.message}
                </p>
              )}
              <p className="ml-auto font-bold">
                {watch("basicProjectSummary")?.length || 0}/500 characters
              </p>
            </div>
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="skillLevel" className={`${sectionHeader}`}>
              Skill Level
              <span className="mb-2/3 text-[2rem]">*</span>
            </label>
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
              <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                {errors.skillLevel.message}
              </p>
            )}
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="discipline" className={`${sectionHeader}`}>
              Discipline<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <div
              className={`${styledBorder} gap-4 flex flex-wrap min-h-[50px] w-full items-center 
                            ${errors?.disciplines ? "border-MVP-red" : ""}`}
            >
              {watch("disciplines").map((discipline) => (
                <div
                  key={discipline}
                  className={`rounded-full bg-MVP-yellow inline-flex items-center justify-between gap-4 h-10 px-6 py-3 font-semibold text-lg`}
                >
                  <p className="">{discipline}</p>
                  <button
                    type="button"
                    onClick={() => removeDiscipline(discipline)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex-1">
                <select
                  onChange={addDiscipline}
                  className={`w-full h-full text-lg py-2 px-4 bg-transparent focus:outline-none 
                                    disabled:cursor-not-allowed disabled:opacity-50 ${watch("disciplines").length === 3 ? "hidden" : "cursor-pointer"
                    }`}
                  disabled={watch("disciplines").length === 3}
                >
                  <option value={""}>
                    {watch("disciplines").length === 0 &&
                      "Select up to 3 disciplines"}
                  </option>
                  {allDisciplines
                    .filter((discipline) => !watch("disciplines").includes(discipline))
                    .map((discipline) => (
                      <option key={discipline} value={discipline}>
                        {discipline}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {errors?.disciplines && (
              <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                {errors?.disciplines.message}
              </p>
            )}
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="theme" className={`${sectionHeader}`}>
              Theme<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <div
              className={`${styledBorder} gap-4 flex flex-wrap min-h-[50px] w-full items-center 
                            ${errors?.themes ? "border-MVP-red" : ""}`}
            >
              {watch("themes").map((theme) => (
                <div
                  key={theme}
                  className={`rounded-full bg-MVP-yellow inline-flex items-center justify-between gap-4 h-10 px-6 py-3 font-semibold text-lg`}
                >
                  <p>{theme}</p>
                  <button type="button" onClick={() => removeTheme(theme)}>
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex-1">
                <select
                  onChange={addTheme}
                  className={`w-full h-full text-lg py-2 px-4 bg-transparent focus:outline-none disabled:cursor-not-allowed
                                    disabled:opacity-50 ${watch("themes").length === 3 ? "hidden" : "cursor-pointer"}`}
                  disabled={watch("themes").length === 3}
                >
                  <option value={""}>
                    {watch("themes").length === 0 && "Select up to 3 themes"}
                  </option>
                  {allThemes
                    .filter((theme) => !watch("themes").includes(theme))
                    .map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            {errors.themes && (
              <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                {errors.themes.message}
              </p>
            )}
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label htmlFor="eventDuration" className={`${sectionHeader}`}>
              Event Duration
              <span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <div>
              <span className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>Start<span className="mb-2/3 text-[2rem]">*</span></span>
              <DateTimePicker
                control={control}
                dateFieldName="startDate"
                timeFieldName="startTime"
                label="Start Date"
                minDate={new Date()}
                maxDate={watch('endDate') ? new Date(watch('endDate')) : undefined} // If you want to prevent selecting dates after end date
                errorDate={errors.startDate}

              />

              <div className="flex gap-[3rem]">
                {errors.startDate && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startDate.message}</p>}
                {errors.startTime && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.startTime.message}</p>}
              </div>
            </div>

            <div>
              <label className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}>End<span className="mb-2/3 text-[2rem]">*</span></label>
              <DateTimePicker
                errorDate={errors.endDate}
                control={control}
                dateFieldName="endDate"
                timeFieldName="endTime"
                label="End Date"
                minDate={watch('startDate') ? new Date(watch('startDate')) : undefined}
                maxDate=""
              />
            </div>
            <div className="flex gap-[3.5rem]">
              {errors.endDate && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.endDate.message}</p>}
              {errors.endTime && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.endTime.message}</p>}
            </div>
          </div>
          <div className="mb-[1rem] flex flex-col">
            <label className={`${sectionHeader}`}>
              Timezone<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <div
              className={`${styledBorder} ${errors.timezone && "border-MVP-red"}`}
            >
              <select
                {...register("timezone", {
                  required: "Timezone is required",
                })}
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
            <label className={`${sectionHeader}`}>
              Meeting Link
              <span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <input
              type="url"
              {...register("meetingLink", {
                required: "Meeting Link is required",
                maxLength: 80,
              })}
              placeholder="Enter meeting link"
              className={`${styledBorder} text-[1.2rem] flex items-center ${errors.meetingLink && "border-MVP-red"}`}
              maxLength={80}
            />
            <div className="flex">
              {errors.meetingLink && (
                <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                  {errors.meetingLink.message}
                </p>
              )}
              <p className="ml-auto font-bold">
                {watch("meetingLink")?.length || 0}/80 characters
              </p>
            </div>
          </div>
          <div className="mb-[1rem]">
            <label className={`${sectionHeader}`}>
              Participant Count
              <span className="mb-2/3 text-[2rem]">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-col">
                <label
                  className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}
                >
                  Min
                </label>
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
                  placeholder="1"
                  min="1"
                  className={`${styledBorder} w-[90px] h-[64px] text-[1.2rem] text-center`}
                />
              </div>
              <hr className="border-t-4 border-MVP-black w-4 mt-8" />
              <div className="flex-col">
                <label
                  className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}
                >
                  Max
                </label>
                <input
                  type="number"
                  {...register("maxParticipants", {
                    valueAsNumber: true,
                    required: "Maximum participant count is required",
                    validate: (value) =>
                      value >= getValues("minParticipants") + 1 ||
                      "Max participants must be at least 1 more than min participants",
                  })}
                  placeholder="100"
                  min="2"
                  className={`${styledBorder} w-[90px] h-[64px] text-[1.2rem] text-center ${((watch("maxParticipants") <= watch("minParticipants")) || watch("minParticipants") == 0) && "border-MVP-red"}`}
                />
              </div>
            </div>
            {((watch("maxParticipants") <= watch("minParticipants")) || watch("minParticipants") == 0) &&
              <p className="text-MVP-red text-[1rem] mt-[0.3rem]">
                Invalid Range
              </p>
            }
          </div>
          <div className="mb-[3rem] flex-col">
            <label htmlFor="judges" className={`${sectionHeader}`}>
              Judges<span className="mb-2/3 text-[2rem]">*</span>
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex-col flex whitespace-nowrap my-5"
              >
                <div
                  className={`w-full flex gap-[2rem] items-center justify-between`}
                >
                  <label
                    className={`${sectionHeader} !text-[1.3rem] !mb-[0.1rem] !font-bold`}
                  >
                    Judge #{index + 1}
                  </label>
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
                          {errors.judges?.[index]?.firstName.message}
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
                      {errors.judges?.[index]?.lastName &&
                        <p className="text-MVP-red text-[0.8rem] mt-[0.2rem]">
                          {errors.judges[index].lastName.message}
                        </p>
                      }
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(index)}>
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
                  className={`${styledBorder} !py-[0.6rem] bg-MVP-light-blue font-extrabold text-xl disabled:opacity-50`}
                  onClick={() => append({ firstName: "", lastName: "" })}
                  disabled={
                    fields.length > 0 &&
                    (!watch("judges")[fields.length - 1]?.firstName ||
                      !watch("judges")[fields.length - 1]?.lastName)
                  }
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
            <div className="pt-2">
              <FileUploadZone
                onFileChange={handleFileChange}
                acceptedTypes={['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml']}
              />
              <p className={`${STYLES.label} px-2 pt-2`}>supported formats: JPG, PNG, PDF, SVG</p>
              <p className={`${STYLES.label} px-2`}>maximum size: 10MB</p>
            </div>
            <div className="pb-6">
              <div className="flex gap-4">
                {file?.length > 0 && file.map((item, index) => {
                  return (
                    <ImportCard key={`file-${index}`} fileName={item.name} handleDelete={() => handleDeleteFile(index)} />
                  )
                })}
              </div>
              {errors.file && (
                <div className="flex items-center gap-2">
                  <img className="w-10 h-11 basis-3 p-6" src={ErrorIcon} alt="error icon" />
                  <p className="text-red-500">{errors.file.message}</p>
                </div>
              )}
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
            <button
              type="submit"
              className={`${styledBorder} !bg-MVP-light-blue !py-[0.7rem] !px-[1.5rem]`}
            >
              Next
            </button>
          </div>
        </div>

      </section>
    </form >);
};

export default EventForm;