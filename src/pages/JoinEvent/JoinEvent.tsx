import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "../../components/ui/select";
import { STYLES } from "../../constants/styles";
import ErrorIcon from "../../assets/images/error.svg"
import { ROLES } from '../../constants/roles';

const JoinEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("(GMT-0700) Canada (Vancouver) Time");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [discipline, setDiscipline] = useState("Software Developer");
  const [goal, setGoal] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


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

    let validationErrors: { [key: string]: string } = {};

    if (!name) validationErrors.name = "Name is required.";
    if (!location) validationErrors.location = "Location is required.";
    if (!goal) validationErrors.goal = "Goal is required.";
    if (!strength) validationErrors.strength = "Strength is required.";
    if (!weakness) validationErrors.strength = "Weakness is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors if no issues
    setErrors({});

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
    <div className="event-page pb-10">
      <div className="join-event max-w-[1010px] m-auto px-8">
        <h1 className='text-MVP-black font-sans mt-12 text-[2.9rem] font-extrabold leading-[115.645%]'>Join {eventData.title}</h1>
        <form className="join-event__form mt-16 space-y-8" onSubmit={handleSubmit}>
          <div className="join-event__form-group">
            <label htmlFor="name" className={`${STYLES.label}`}>Name*</label>
            <Input
              type="text"
              id="name"
              placeholder="Input name here"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              maxLength={80}
              className={`${STYLES.input} ${errors.name ? "border-red-500" : ""}`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex-1">
                {errors.name && (
                  <div className={`${STYLES.label} text-MVP-red flex items-center`}>
                    <img src={ErrorIcon} alt="Error" className="w-3 h-3 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>
              <span className={`${STYLES.counterStyle} ml-4`}>{name.length}/80 characters</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className={`${STYLES.label}`}>Location*</label>
            <Input
              type="text"
              id="location"
              placeholder="Input location here"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              className={`${STYLES.input} ${errors.location ? "border-MVP-red" : ""}`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex-1">
                {errors.location && (
                  <div className={`${STYLES.label} text-MVP-red flex items-center`}>
                    <img src={ErrorIcon} alt="Error" className="w-3 h-3 mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>
              <span className={`${STYLES.counterStyle} ml-4`}>{location.length}/80 characters</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="timezone" className={`${STYLES.label}`}>Timezone*</label>
            <Select
              onValueChange={(value) => setTimezone(value)}
              defaultValue={timezone}
            >
              <SelectTrigger className={`${STYLES.input}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={`${STYLES.input} ${errors.timezone ? "border-MVP-red" : ""}`}>
                <SelectItem value="(GMT-0700) Canada (Vancouver) Time">(GMT-0700) Canada (Vancouver) Time</SelectItem>
                {/* Add more timezone options here */}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className={`${STYLES.label} m-0 p-0`}>Skill Level*</label>
            <div className="space-y-2 flex gap-4 items-center m-0 p-0">
              {["Beginner", "Intermediate", "Experienced", "Advanced"].map((level) => (
                <label key={level} className="inline-flex items-center  pt-0 gap-2 font-bold font-gilroy">
                  <Input
                    type="radio"
                    name="skillLevel"
                    value={level}
                    checked={skillLevel === level}
                    className="font-gilroy px-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSkillLevel(e.target.value)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="discipline" className={`${STYLES.label}`}>Discipline*</label>
            <Select
              onValueChange={(value) => setDiscipline(value)}
              defaultValue={discipline}
            >
              <SelectTrigger className={`${STYLES.input} ${errors.discipline ? "border-MVP-red" : ""}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`${ROLES.SOFTWARE_DEVELOPER}`}>{ROLES.SOFTWARE_DEVELOPER}</SelectItem>
                <SelectItem value={`${ROLES.DATA_ANALYST}`}>{ROLES.DATA_ANALYST}</SelectItem>
                <SelectItem value={`${ROLES.FRONTEND_DEVELOPER}`}>{ROLES.FRONTEND_DEVELOPER}</SelectItem>
                <SelectItem value={`${ROLES.FULLSTACK_DEVELOPER}`}>{ROLES.FULLSTACK_DEVELOPER}</SelectItem>
                <SelectItem value={`${ROLES.PRODUCT_MANAGER}`}>{ROLES.PRODUCT_MANAGER}</SelectItem>
                <SelectItem value={`${ROLES.UX_DESIGNER}`}>{ROLES.UX_DESIGNER}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="goal" className={`${STYLES.label}`}>Goal/Objective*</label>
            <Textarea
              id="goal"
              placeholder="What do you hope to achieve during this hackathon?"
              value={goal}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
              maxLength={500}
              className={`${STYLES.textareaStyle} ${errors.goal ? "border-MVP-red" : ""}`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex-1">
                {errors.goal && (
                  <div className={`${STYLES.label} text-MVP-red flex items-center`}>
                    <img src={ErrorIcon} alt="Error" className="w-3 h-3 mr-1" />
                    {errors.goal}
                  </div>
                )}
              </div>
              <span className={`${STYLES.counterStyle} ml-4`}>{goal.length}/500 characters</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="strength" className={`${STYLES.label}`}>Strength*</label>
            <Textarea
              id="strength"
              placeholder="What are your strengths?"
              value={strength}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStrength(e.target.value)}
              className={`${STYLES.textareaStyle} ${errors.strength ? "border-MVP-red" : ""}`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex-1">
                {errors.strength && (
                  <div className={`${STYLES.label} text-MVP-red flex items-center`}>
                    <img src={ErrorIcon} alt="Error" className="w-3 h-3 mr-1" />
                    {errors.strength}
                  </div>
                )}
              </div>
              <span className={`${STYLES.counterStyle} ml-4`}>{strength.length}/500 characters</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="weakness" className={`${STYLES.label}`}>Weakness*</label>
            <Textarea
              id="weakness"
              placeholder="What are your weakness?"
              value={weakness}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setWeakness(e.target.value)}
              className={`${STYLES.textareaStyle} ${errors.weakness ? "border-MVP-red" : ""}`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex-1">
                {errors.weakness && (
                  <div className={`${STYLES.label} text-MVP-red flex items-center`}>
                    <img src={ErrorIcon} alt="Error" className="w-3 h-3 mr-1" />
                    {errors.weakness}
                  </div>
                )}
              </div>
              <span className={`${STYLES.counterStyle} ml-4`}>{weakness.length}/500 characters</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-10">
            <Button type="button" className={`${STYLES.secondaryButton}`} onClick={() => navigate(-1)}>Back</Button>
            <Button type="submit" className={`${STYLES.primaryButton}`}>
              Join Event
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default JoinEvent;
