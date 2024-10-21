import "./JoinEvent.scss";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { useAuth } from "../../context/AuthContext";

const JoinEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("(GMT-0700) Canada (Vancouver) Time");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [discipline, setDiscipline] = useState("Developer");
  const [goal, setGoal] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const docRef = doc(db, "hackathonEvents", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEventData(docSnap.data());
        } else {
          console.log("No such document!");
          navigate("/hackathons");
        }
      } catch (error) {
        console.error("Error fetching event data: ", error);
        navigate("/hackathons");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !eventId) return;

    const participantData = {
      name,
      location,
      timezone,
      skillLevel,
      discipline,
      goal,
      strength,
      weakness,
      registeredAt: new Date().toISOString()
    };

    try {
      const eventRef = doc(db, "hackathonParticipantData", eventId);
      const participantRef = doc(db, "hackathonUsers", currentUser.uid);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.exists() && eventSnap.data()?.[currentUser.uid]) {
        alert("You are already registered for this event.");
        return;
      }

      await setDoc(eventRef, {
          [currentUser.uid]: participantData
      }, { merge: true });

      await setDoc(participantRef, {
        joinedEvents: arrayUnion(eventId)
    }, { merge: true });

      console.log("Participant data saved successfully");
    } catch (error) {
      console.error("Error saving participant data:", error);
    }
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-page">
      <div className="join-event">
        <h1 className="join-event__title">Join {eventData.title}</h1>
        <form className="join-event__form" onSubmit={handleSubmit}>
        <div className="join-event__form-group">
          <label htmlFor="name" className="join-event__label">Name*</label>
          <input
            type="text"
            id="name"
            className="join-event__input"
            placeholder="Input name here"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            maxLength={80}
          />
          <span className="join-event__char-count">{name.length}/80 characters</span>
        </div>

        <div className="join-event__form-group">
          <label htmlFor="location" className="join-event__label">Location*</label>
          <input
            type="text"
            id="location"
            className="join-event__input"
            placeholder="Input location here"
            value={location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
          />
        </div>

        <div className="join-event__form-group">
          <label htmlFor="timezone" className="join-event__label">Timezone*</label>
          <select
            id="timezone"
            className="join-event__select"
            value={timezone}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimezone(e.target.value)}
          >
            <option value="(GMT-0700) Canada (Vancouver) Time">(GMT-0700) Canada (Vancouver) Time</option>
            {/* Add more timezone options here */}
          </select>
        </div>

        <div className="join-event__form-group">
          <label className="join-event__label">Skill Level*</label>
          <div className="join-event__radio-group">
            {["Beginner", "Intermediate", "Level 4", "Level 5"].map((level) => (
              <label key={level} className="join-event__radio-label">
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={skillLevel === level}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSkillLevel(e.target.value)}
                  className="join-event__radio"
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="join-event__form-group">
          <label htmlFor="discipline" className="join-event__label">Discipline*</label>
          <select
            id="discipline"
            className="join-event__select"
            value={discipline}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setDiscipline(e.target.value)}
          >
            <option value="Developer">Developer</option>
            {/* Add more discipline options here */}
          </select>
        </div>

        <div className="join-event__form-group">
          <label htmlFor="goal" className="join-event__label">Goal/Objective*</label>
          <textarea
            id="goal"
            className="join-event__textarea"
            placeholder="What do you hope to achieve during this hackathon?"
            value={goal}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
            maxLength={500}
          ></textarea>
          <span className="join-event__char-count">{goal.length}/500 characters</span>
        </div>

        <div className="join-event__form-group">
          <label htmlFor="strength" className="join-event__label">Strength*</label>
          <textarea
            id="strength"
            className="join-event__textarea"
            placeholder="What are your strengths?"
            value={strength}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStrength(e.target.value)}
            maxLength={500}
          ></textarea>
          <span className="join-event__char-count">{strength.length}/500 characters</span>
        </div>

        <div className="join-event__form-group">
          <label htmlFor="weakness" className="join-event__label">Weakness*</label>
          <textarea
            id="weakness"
            className="join-event__textarea"
            placeholder="What are your weaknesses?"
            value={weakness}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setWeakness(e.target.value)}
            maxLength={500}
          ></textarea>
          <span className="join-event__char-count">{weakness.length}/500 characters</span>
        </div>

        <div className="join-event__buttons">
          <button type="submit" className="join-event__submit">Join</button>
          <button type="button" className="join-event__cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default JoinEvent;