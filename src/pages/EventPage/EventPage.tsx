import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchHackathonEvents } from "../../Firebase/FirebaseQueries";
import { HackathonEventType } from "../../Firebase/FirebaseQueries";
import { STYLES } from '../../constants/styles';
import { convertDate } from "../../utils/dateAndTimeFunctions";
import useEventData from "../../hooks/usEventData";
import { formatStringToNumberedListWithOptions } from "../../utils/formatTextFunctions"
import DetailCard from "../../components/DetailCard/DetailCard";
import ParticipantInfoChip from "../../components/ParticipantInfoChip/ParticipantInfoChip";
import AddToCalendarButton from "../../components/AddToCalendarButton/AddToCalendarButton";
import StackedProfiles from "../../components/StackedProfiles/StackedProfiles";
import ExportButton from "../../components/ExportButton/ExportButton";
import EventPageStatusTag from "../../components/EventPageStatusTag/EventPageStatusTag";
import Clock from "../../assets/images/clockIcon.svg"
import CalendarIcon from "../../assets/images/calendar2.svg"
import LocationIcon from "../../assets/images/location.png"
import LinkIcon from "../../assets/images/linkIcon.svg"
import useEventCountdown from "../../hooks/useEventCountdown";

const EventPage = () => {
  const [event, setEvent] = useState<HackathonEventType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(null);

  const { eventId } = useParams()
  const navigate = useNavigate()
  const { submissions, participantCount, formattedUserNames, exportData, exportFields, } = useEventData(eventId);

  const { formattedTime, ended } = useEventCountdown(eventId || '', "start");

  useEffect(() => {
      if (ended) {
          setStatus("ongoing");
      }
  }, [ended]);
  useEffect(() => {
    async function loadEvent() {
      setIsLoading(true);
      setError(null);

      try {
        const { event, error } = await fetchHackathonEvents(eventId);

        if (error) {
          setError(error);
        } else {
          setEvent(event);

        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  useEffect(() => {
    if (event) {
      const startTime = new Date(event.startTime).getTime();
      const endTime = new Date(event.endTime).getTime();
      const now = Date.now();
  
      if (now < endTime) {
        if (now < startTime) {
          setStatus("not started");
        } else {
          setStatus("ongoing");
        }
      } else {
        setStatus("ended");
      }
    }
  }, [event]);

  if (!event) {
    return <div>No event data available</div>;
  }

  const { date: eventStartDate, time: eventStartTime } = convertDate(event.startDate, event.startTime, event.timeZone);
  const { date: eventEndDate, time: eventEndTime } = convertDate(event.endDate, event.endTime, event.timeZone);
  const formatThemes = [...(event?.themes || []), ...(event?.disciplines || [])];
  const eventSubheading = "font-bold text-3xl font-gilroy pb-2";


  if (isLoading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  const eventState = () => {
    if (status === 'not started') {
        return (
            <span className="font-gilroy text-xl font-bold">
                Event Starts in: {formattedTime}
            </span>
        );
    } else if (status === 'ongoing') {
        return (
            <span className="font-gilroy text-xl font-bold">
                Event is ongoing, happy hacking!
            </span>
        );
    } else if (status === 'ended') {
        return (
            <span className="font-gilroy text-xl font-bold">
                Event ended
            </span>
        );
    }
  };

  console.log(status);

  return (
    <main className="w-full  relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <div className="w-full max-w-[1130px] h-full flex flex-col m-auto pb-32">
        <div className="h-72 w-full bg-cover m-auto">
          <img className="h-full w-full object-cover" src={event.imageUrl} alt={`hero for ${event.title}`} />
        </div>
        <section className="gap-6 space-y-6">
          <div className="flex">
            {/* Event Details Left*/}
            <div className="px-6 flex flex-col gap-6 w-3/4">
              <div className="flex items-center gap-2 mt-8" role="alert">
                <img className="h-4" src={Clock} alt="Clock icon indicating time remaining" />
                {eventState()}
              </div>
              <h1 className="text-3xl md:text-6xl font-gilroy mt-8 font-bold">{event.title}</h1>
              <DetailCard text={event.skillLevel} />
              <p className="font-poppins">{event.basicProjectSummary}</p>
              <section aria-labelledby="themes">
                <h2 id="themes" className="font-bold font-gilroy text-3xl my-3">Themes</h2>
                <div className="flex gap-3 flex-wrap">
                  {formatThemes.map((theme, index) => (
                    <DetailCard key={index} text={theme} />
                  ))}
                </div>
              </section>
              <section aria-labelledby="judges">
                <h2 id="judges" className="font-bold font-gilroy text-3xl my-3">Judges</h2>
                <div className="flex gap-3 flex-wrap">
                  {event.judges.map((judge, index) => (
                    <ParticipantInfoChip key={index} integer={index} fullName={`${judge["firstName"]} ${judge["lastName"]}`} role="Software Developer" />
                  ))}
                </div>
              </section>
            </div>

            {/* Event Details Right*/}
            <section className="mt-8 w-1/4 flex flex-col gap-6 px-6">
              <EventPageStatusTag userRole="normal" eventStatus="ongoing" />
              <div className="max-w-60">
                <p className="font-bold font-gilroy text-2xl mb-2">Organized by</p>
                <ParticipantInfoChip integer={6} fullName={event.organizer} role="Software Developer" />
              </div>
              <div>
                <p className="font-bold font-gilroy text-2xl mb-2">Starts:</p>
                <div className="flex gap-4">
                  <img className="h-8" src={CalendarIcon} alt="calendar icon" />
                  <div className="flex flex-col">
                    <span className="font-gilroy font-bold text-xl">{eventStartDate}</span>
                    <span className="font-gilroy font-bold text-xl">{eventStartTime}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold font-gilroy text-2xl mb-2">Ends:</p>
                <div className="flex gap-4">
                  <img className="h-8" src={CalendarIcon} alt="calendar icon" />
                  <div className="flex flex-col">
                    <span className="font-gilroy font-bold text-xl">{eventEndDate}</span>
                    <span className="font-gilroy font-bold text-xl">{eventEndTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <img src={LocationIcon} alt="location icon" />
                <span className="font-gilroy font-bold text-xl"> Location:  Online</span>
              </div>
              <AddToCalendarButton
                description={event.title}
                startDate={event.startDate}
                startTime={event.startTime}
                endDate={event.endDate}
                endTime={event.endTime}
                timezone={event.timeZone}
                location={event.meetingLink} />
              <Link to={`${event.meetingLink}`}>
                <button className={`${STYLES.primaryButton} rounded-[10px] flex gap-4 justify-center items-center`} type="button" aria-label="link to online hackathon meeting">
                  <img src={LinkIcon} alt="Link icon" />
                  <span className="font-bold">Event Link</span>
                </button>
              </Link>
            </section>

          </div>
          <section className="w-3/4 px-6 ">
            <div className="flex justify-start gap-8">
              <div className="flex gap-3 items-center">
                <h3 className="font-bold font-gilroy text-2xl my-3">Registrants</h3>
                <span>({submissions.length}/{event.maxParticipants})</span>
              </div>
              {submissions.length === 0 ?
                <div className={`${STYLES.primaryButton} bg-MVP-white border-MVP-gray text-MVP-gray rounded-[10px] flex items-center`} >
                  Export Registrants List
                </div>
                : <ExportButton data={exportData} fields={exportFields} />}
            </div>
            <div className="flex flex-col">
              <StackedProfiles />
              <p className="font-poppins mt-12">{formattedUserNames}</p>
            </div>
          </section>
          <section className="w-3/4 px-6 space-y-8">
            <div>
              <h2 className="text-5xl font-bold font-gilroy">Challenge Details</h2>
              <div className="flex gap-2 items-center mt-4">
                <img className="h-6" src={Clock} alt="clock icon" />
                <p className="font-bold font-gilroy">Challenge details published in: 14days</p>
              </div>
            </div>
            <div>
              <h3 className={`${eventSubheading}`}>Problem Statement</h3>
              <p className="font-poppins">
                {event.problemStatement}
              </p>
            </div>
            <div>
              <h3 className={`${eventSubheading}`}>Objective/Goals</h3>
              {formatStringToNumberedListWithOptions(event.objectivesGoals)}
            </div>
            <div>
              <h3 className={`${eventSubheading}`}>Constraints/Limitations</h3>
              {formatStringToNumberedListWithOptions(event.constraints)}
            </div>
            <div>
              <h3 className={`${eventSubheading}`}>Evaluation Criteria</h3>
              {formatStringToNumberedListWithOptions(event.evaluationCriteria)}
            </div>
            <div>
              <h3 className={`${eventSubheading}`}>Additional Information</h3>
              <p className="font-poppins">
                {event.additionalInformation}
              </p>
            </div>
          </section>

        </section>
      </div>
      {/* Banner */}
      {status === "ongoing" &&
        <section className="h-[100px] z-50  w-full fixed bottom-0 px-8 border-t-[3px] border-MVP-black bg-MVP-white flex justify-between items-center">
          <div className="flex gap-2 ">
            <img className="h-6" src={Clock} alt="clock icon" />
            <p className="font-gilroy font-bold">Time left to submit: 50m:15s</p>
          </div>
          <button className={`${STYLES.primaryButton} rounded-[10px] w-auto`} aria-label="Submit Project">
            <Link to={`/event/${eventId}/submit`} >Submit Project</Link>
          </button>
        </section>
      }
    </main>)
}


export default EventPage
