import { useNavigate, useLocation } from "react-router-dom";
import { saveEventToFirestore } from "../../Firebase/Firebaseutils";
import { clearFormData } from "./StorageUtils";

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
