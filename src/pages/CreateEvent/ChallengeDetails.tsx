import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveEventToFirestore } from "../../Firebase/Firebaseutils";
import { saveFormData, getFormData, clearFormData } from "./StorageUtils";
import { STYLES } from "../../constants/styles";

const { styledBorder, sectionHeader } = STYLES;

interface ChallengeDetailsFormInputs {
  challengeReleaseDate: string;
  challengeReleaseTime: string;
  problemStatement: string;
  objectivesGoals: string;
  constraints: string;
  evaluationCriteria: string;
  additionalInformation: string;
}

const ChallengeDetailsForm: React.FC = () => {
  const savedData = getFormData("challengeDetailsData");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ChallengeDetailsFormInputs>({
    defaultValues: {
      challengeReleaseDate: savedData?.challengeReleaseDate || "",
      challengeReleaseTime: savedData?.challengeReleaseTime || "",
      problemStatement: savedData?.problemStatement || "",
      objectivesGoals: savedData?.objectivesGoals || "",
      constraints: savedData?.constraints || "",
      evaluationCriteria: savedData?.evaluationCriteria || "",
      additionalInformation: savedData?.additionalInformation || "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: ChallengeDetailsFormInputs) => {
    // saveFormData("challengeDetailsData", data);
    const eventData = getFormData("eventFormData");
    const combinedData = {
      ...eventData,
      ...data,
    };

    try {
      await saveEventToFirestore(combinedData);
      clearFormData("eventFormData");
      clearFormData("challengeDetailsData")
  } catch (error) {
      console.error("Error saving event data:", error);
  } finally {
      navigate("/hackathons");
  }
  };

  const handlePreviousClick = () => {
    const data = watch();
    saveFormData("challengeDetailsData", data);
    navigate("/EventForm");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto py-[3.5rem] px-[1.5rem] rounded-lg font-gilroy">
      <section className="mb-[1.3rem]">
      <h2 className="font-bold text-[3rem] leading-[115.645%]">Create an Event</h2>
      <div className="flex gap-[2rem] my-[3.5rem] font-extrabold text-[1.2rem]">
        <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">1</div> Event Details</div>
        <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">2</div> Challenge Details</div>
        <div className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}><div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">3</div> Review</div>
      </div>
      <div className="py-[0.5rem] px-[2rem]">
        <div className="mb-[1rem] flex flex-col">
          <label htmlFor="challengeReleaseDate" className={`${sectionHeader}`}>Challenge Release Date<span className="mb-2/3 text-[2rem]">*</span></label>
          <div className={`${styledBorder} flex w-fit h-[3rem] !px-[1rem] !py-0 items-center justify-center gap-[1rem] ${(errors.challengeReleaseDate || errors.challengeReleaseTime) && 'border-MVP-red'}`}>
            <Controller
              name="challengeReleaseDate"
              control={control}
              rules={{ required: "Release date is required" }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0"
                />
              )}
            />
            <div className="border-l-[0.18rem] border-MVP-black h-[70%]"/>
            <Controller
              name="challengeReleaseTime"
              control={control}
              rules={{ required: "Release time is required" }}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  className="bg-transparent outline-none font-inherit text-inherit cursor-pointer border-0"
                />
              )}
            />
          </div>
          <div className="flex gap-[2.6rem]">
              {errors.challengeReleaseDate && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.challengeReleaseDate.message}</p>}
              {errors.challengeReleaseTime && <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.challengeReleaseTime.message}</p>}
          </div>
        </div>

        <div className="mb-[1rem] flex flex-col">
        <label htmlFor="problemStatement" className={`${sectionHeader}`}>Problem Statement<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("problemStatement", {
              required: "Problem statement is required",
              maxLength: 500,
            })}
            className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.problemStatement && "border-MVP-red"}`}
            placeholder="Enter the Problem Statement"
            maxLength={500}
          />
          <div className="flex">
          {errors.problemStatement && (
            <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.problemStatement.message}</p>
          )}
          <p className="ml-auto font-bold">
            {watch("problemStatement")?.length || 0}/500 characters
          </p>
          </div>
        </div>

        <div className="mb-[1rem] flex flex-col">
        <label htmlFor="objectivesGoals" className={`${sectionHeader}`}>Objectives/Goals<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("objectivesGoals", {
              required: "Objectives/Goals are required",
              maxLength: 500,
            })}
            className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.objectivesGoals && "border-MVP-red"}`}
            placeholder="Enter the objectives/goals"
            maxLength={500}
          />
          <div className="flex">
            {errors.objectivesGoals && (
              <p className="text-MVP-red text-[0.8rem] mt-[0.3rem]">{errors.objectivesGoals.message}</p>
            )}
            <p className="ml-auto font-bold">
              {watch("objectivesGoals")?.length || 0}/500 characters
            </p>
          </div>
        </div>

        <div className="mb-[1rem] flex flex-col">
        <label htmlFor="constraints" className={`${sectionHeader}`}>Constraints/Limitations<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("constraints", { maxLength: 500 })}
            placeholder="Enter the constraints/limitations"
            className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.constraints && "border-MVP-red"}`}
            maxLength={500}
          />
          <p className="ml-auto font-bold">
            {watch("constraints")?.length || 0}/500 characters
          </p>
        </div>

        <div className="mb-[1rem] flex flex-col">
        <label htmlFor="evaluationCriteria" className={`${sectionHeader}`}>Evaluation Criteria<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("evaluationCriteria", { maxLength: 500 })}
            placeholder="Enter the evaluation criteria"
            maxLength={500}
            className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.evaluationCriteria && "border-MVP-red"}`}
          />
          <p className="ml-auto font-bold">
            {watch("evaluationCriteria")?.length || 0}/500 characters
          </p>
        </div>

        <div className="mb-[1rem] flex flex-col">
        <label htmlFor="additionalInformation" className={`${sectionHeader}`}>Additional Information<span className="mb-2/3 text-[2rem]">*</span></label>
          <textarea
            {...register("additionalInformation", { maxLength: 500 })}
            placeholder="Enter any additional information needed"
            maxLength={500}
            className={`${styledBorder} text-[1.2rem] flex items-center min-h-[12rem] ${errors.additionalInformation && "border-MVP-red"}`}
          />
          <p className="ml-auto font-bold">
            {watch("additionalInformation")?.length || 0}/500 characters
          </p>
        </div>
          <div className="flex justify-end gap-[2rem] my-10 font-extrabold text-2xl">
            <button
              type="button"
              className={`${styledBorder} !py-[0.7rem] !px-[1.5rem]`}
              onClick={handlePreviousClick}
            >
              Previous
            </button>
            <button type="submit" className={`${styledBorder} !bg-MVP-light-blue !py-[0.7rem] !px-[1.5rem]`}>
              Review
            </button>
        </div>
      </div>
      </section>
    </form>
  );
};

export default ChallengeDetailsForm;
