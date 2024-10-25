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
      <h1>Preview Your Event</h1>
      <div>
        <h2>{eventData.title}</h2>
        <p>Organizer: {eventData.organizer}</p>
        <p>Start Date: {eventData.eventStartDate}</p>
        <p>End Date: {eventData.eventEndDate}</p>
        <p>Challenge Release Date: {eventData.challengeReleaseDate}</p>
        <p>Challenge Release Time: {eventData.challengeReleaseTime}</p>
      </div>

      <div className="buttons">
        <button onClick={() => navigate("/ChallengeDetails", { state: { eventData } })}>Back</button>
        <button onClick={handlePublish}>Publish</button>
      </div>
    </div>
  );
};

export default PreviewEvent;
