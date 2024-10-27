import { useNavigate, useLocation } from "react-router-dom";
import { saveEventToFirestore } from "../../Firebase/Firebaseutils";
import { uploadFiles } from "../../Firebase/FirebaseStore"
import { clearFormData } from "./StorageUtils";
import { STYLES } from "../../constants/styles";
import { formatStringToNumberedList } from "../../utils/formatTextFunctions"
import Checkmark from "../../assets/images/checkmarkFilled.svg"

const { styledBorder, sectionHeader } = STYLES;

const DataField = ({ label, value, labelClass, valueClass }) => {
  return (
    <p className={labelClass}>
      {label}:
      <span className={valueClass}>{value}</span>
    </p>
  );
};

const PreviewEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state?.eventData;

  const handlePublish = async () => {
    try {
      const projectFileURL = await uploadFiles(eventData);
      const dataWithImageUrl = {
        ...eventData,
        imageUrl: projectFileURL
      };
      delete dataWithImageUrl.file;
  
      // Save the event data to Firestore and get the document reference
      const docRef = await saveEventToFirestore(dataWithImageUrl);
  
      // Clear form data
      clearFormData("eventFormData");
      clearFormData("challengeDetailsData");
  
      // Redirect to the specific event page using the eventId from Firestore
      navigate(`/event/${docRef.id}`);
    } catch (error) {
      console.error("Error saving event data:", error);
    }
  };
  
  

  const subHeading = "text-lg font-bold mt-4"
  const textStyle = "font-normal px-2"

  const fields = [
    { label: "Event Title", value: eventData.title, labelClass: subHeading },
    { label: "Organizer", value: eventData.organizer },
    { label: "Event Description", value: eventData.basicProjectSummary },
    { label: "Skill Level", value: eventData.skillLevel },
    { label: "Theme(s)", value: Array.isArray(eventData.themes) ? eventData.themes.join(", ") : eventData.themes },
    {
      label: "Event Duration",
      value: `${eventData.startDate} to ${eventData.endDate}`,
    },
    { label: "Meeting Link", value: eventData.meetingLink },
    {
      label: "Participant Count",
      value: `${eventData.minParticipants} - ${eventData.maxParticipants}`,
    },
    {
      label: "Judges",
      value: Array.isArray(eventData.judges)
        ? eventData.judges.map(judge => `${judge.firstName} ${judge.lastName}`).join(", ")
        : "N/A",
    },
  ];

  return (
    <div className="max-w-[1026px] mx-auto px-6– font-gilroy">
      <section className="flex gap-[2rem] my-[3.5rem] font-extrabold text-[1.2rem]">
        <div
          className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}
        >
          <img src={Checkmark} alt="completed checkmark icon" />
          Event Details
        </div>
        <div
          className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}
        >
          <img src={Checkmark} alt="completed checkmark icon" />
          Challenge Details
        </div>
        <div
          className={`${styledBorder} rounded-none bg-MVP-yellow flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center`}
        >
          <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
            3
          </div>{" "}
          Review
        </div>
      </section>

      <main className="px-8 font-gilroy flex flex-col">
        <h1 className={`${sectionHeader} font-gilroy`}>Event Details</h1>
        <div>
          {fields.map((field, index) => (
            <DataField
              key={index}
              label={field.label}
              value={field.value}
              labelClass={`${subHeading}`}
              valueClass={textStyle}
            />
          ))}

        </div>
        <div className="flex flex-col space-y-2 pb-8">
          <h2 className={`${sectionHeader} pt-8`}>Challenge Details</h2>

          <p className={subHeading}>
            Challenge Release Date: <span className={textStyle}>{eventData.challengeReleaseDate} (
              {eventData.challengeReleaseTime})</span>
          </p>
          <div>
            <h3 className={`${subHeading}`}>Problem Statement: </h3>
            <p>{formatStringToNumberedList(eventData.problemStatement)}</p>
          </div>
          <div>
            <h3 className={`${subHeading}`}>Objective/Goals:</h3>
            <p>{formatStringToNumberedList(eventData.objectivesGoals)}</p>
          </div>
          <div>
            <h3 className={`${subHeading}`}>Constraints/Limitations: </h3>
            <p>{formatStringToNumberedList(eventData.constraints)}</p>
          </div>
          <div>
            <h3 className={`${subHeading}`}>Evaluation Criteria: </h3>
            <p>{formatStringToNumberedList(eventData.evaluationCriteria)}</p>
          </div>
          <div>
            <h3 className={`${subHeading}`}>Additional Information:</h3>
            <p> {eventData.additionalInformation}</p>
          </div>
        </div>
      </main>

      <div className="buttons flex justify-end gap-8 pb-10">
        <button
          type="button"
          className={`${styledBorder} font-bold !py-[0.7rem] !px-[1.5rem] text-xl`}
          onClick={() =>
            navigate("/challengedetails", { state: { eventData } })
          }
        >
          Previous
        </button>
        <button
          type="submit"
          className={`${styledBorder} font-bold  !bg-MVP-light-blue !py-[0.7rem] !px-[1.5rem] text-xl`}
          onClick={handlePublish}
        >
          Publish Event
        </button>
      </div>
    </div>
  );
};

export default PreviewEvent;
