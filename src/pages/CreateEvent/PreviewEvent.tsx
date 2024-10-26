import { useNavigate, useLocation } from "react-router-dom";
import { saveEventToFirestore } from "../../Firebase/Firebaseutils";
import { clearFormData } from "./StorageUtils";
import { STYLES } from "../../constants/styles";

const { styledBorder, sectionHeader } = STYLES;

const PreviewEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state?.eventData;

  const handlePublish = async () => {
    try {
      await saveEventToFirestore(eventData);
      clearFormData("eventFormData");
      clearFormData("challengeDetailsData");
      navigate("/hackathons");
    } catch (error) {
      console.error("Error saving event data:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-[2rem] my-[3.5rem] font-extrabold text-[1.2rem]">
        <div
          className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}
        >
          <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
            1
          </div>{" "}
          Event Details
        </div>
        <div
          className={`${styledBorder} rounded-none flex flex-1 gap-[0.8rem] !py-[0.6rem] !px-0 justify-center items-center text-center bg-MVP-yellow`}
        >
          <div className="flex justify-center items-center rounded-full h-full border-MVP-black border-[0.1rem] aspect-square">
            2
          </div>{" "}
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
      </div>
      <h1 className={`${sectionHeader}`}>Event Details</h1>
      <div>
        <h2>Event Title: {eventData.title}</h2>
        <p>Organizer: {eventData.organizer}</p>
        <p>Event Description: {eventData.basicProjectSummary}</p>
        <p>Skill Level: {eventData.skillLevel}</p>
        <p>Theme(s): {eventData.themes}</p>
        <p>
          Event Duration: {eventData.eventStartDate} - {eventData.eventEndDate}
        </p>
        <p>Meeting Link: {eventData.meetingLink}</p>
        <p>
          Participant Count: {eventData.minParticipants} -{" "}
          {eventData.maxParticipants}
        </p>
        <h1 className={`${sectionHeader}`}>Challenge Details</h1>

        <p>
          Challenge Release Date: {eventData.challengeReleaseDate} (
          {eventData.challengeReleaseTime})
        </p>
        <p>Problem Statement: {eventData.problemStatement}</p>
        <p>Objective/Goals: {eventData.objectivesGoals}</p>
        <p>Constraints/Limitations: {eventData.constraints}</p>
        <p>Evaluation Criteria: {eventData.evaluationCriteria}</p>
        <p>Additional Information: {eventData.additionalInformation}</p>
      </div>

      <div className="buttons">
        <button
          type="button"
          className={`${styledBorder} !py-[0.7rem] !px-[1.5rem]`}
          onClick={() =>
            navigate("/challengedetails", { state: { eventData } })
          }
        >
          Previous
        </button>
        <button
          type="submit"
          className={`${styledBorder} !bg-MVP-light-blue !py-[0.7rem] !px-[1.5rem]`}
          onClick={handlePublish}
        >
          Publish Event
        </button>
      </div>
    </div>
  );
};

export default PreviewEvent;
