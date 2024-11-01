import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { fetchHackathonEvents } from "../../Firebase/FirebaseQueries";
import { HackathonEventType } from "../../Firebase/FirebaseQueries";
import { STYLES } from '../../constants/styles';
import { convertDate } from "../../utils/dateAndTimeFunctions";
import useEventData from "../../hooks/useEventData";
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
import { auth } from '../../Firebase/FirebaseConfig';
import { useJoinedEvents } from "../../Firebase/FirebaseQueries";
import { useEventSubmissions } from "../../hooks/useEventSubmissions";

const EventPage = () => {

  const [event, setEvent] = useState<HackathonEventType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("not started");
  const { joinedEvents } = useJoinedEvents(auth.currentUser?.uid);
  const [ userSubmitted, setUserSubmitted ] = useState(null);
  const { eventId } = useParams();
  const { formattedUserNames, exportData, exportFields, } = useEventData(eventId);
  const { allSubmissions: submissions } = useEventSubmissions(eventId);
const { formattedTime: countTimeStart, ended: countdownStartEnded, timeRemaining } = useEventCountdown(eventId || '', "start");
const { formattedTime: countTimeEnd, ended: countdownEndEnded } = useEventCountdown((countdownStartEnded && eventId) || '', "end");

  const { styledBorder } = STYLES; 
  const submission = submissions
    .find(submission => submission.userId === auth.currentUser?.uid) || null

  useEffect(() => {
    if (submission) {
      setUserSubmitted(true);
    }
  }, [submission])

  useEffect(() => {
    if (countdownStartEnded) {
      console.log(countdownStartEnded);
      setStatus("ongoing");
    }
  }, [countdownStartEnded]);

  useEffect(() => {
    if (countdownEndEnded) {
      setStatus("ended");
    }
  }, [countdownEndEnded]);

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

  if (!event && isLoading) {
    return <p>Loading...</p>;
  }
  if (!event && error) {
    return <p>Error: {error}</p>;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short'
};

  const { date: eventStartDate, time: eventStartTime } = convertDate(event.startDate, event.startTime, event.timeZone);
  const { date: eventEndDate, time: eventEndTime } = convertDate(event.endDate, event.endTime, event.timeZone);
  const formatThemes = [...(event?.themes || []), ...(event?.disciplines || [])];
  const eventSubheading = "font-bold text-3xl font-gilroy pb-2";

  const eventState = () => {
    if (!submission) {
      if (status === 'not started') {
          return (
            <div className="flex items-center gap-4 mt-8" role="alert">
              <img className="h-5" src={Clock} alt="Clock icon indicating time remaining" />
              <span className="font-gilroy text-2xl font-bold">
                  Event Starts in: {countTimeStart}
              </span>
            </div>
          );
      } else if (status === 'ongoing') {
          return (
            <div className="flex items-center gap-4 mt-8" role="alert">
              <img className="h-5" src={Clock} alt="Clock icon indicating time remaining" />
              <span className="font-gilroy text-2xl font-bold">
                  Event is ongoing, happy hacking!
              </span>
            </div>
          );
      } else if (status === 'ended') {
          return (
            null
          );
      }
    }
  };

  return (
    <main className="w-full relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <div className="w-full max-w-[1130px] h-full flex flex-col m-auto pb-32">
        <div className="h-72 w-full bg-cover m-auto">
          <img className="h-full w-full object-cover" src={event.imageUrl} alt={`hero for ${event.title}`} />
        </div>
        <section className="gap-6 space-y-6">
          {(status !== "not started" && userSubmitted) ?
          <div className="bg-[#F3EECD] w-full flex py-[1.3rem] px-[1.6rem] items-center h-[6rem] my-[2rem] rounded-[12px]">
            <h1 className="text-[#1E1E1E] font-gilroy text-[1.4rem] font-extrabold">Submitted on: <span className="text-[#1E1E1E] font-poppins text-[1.4rem] font-normal">{submission?.createdAt.toDate().toLocaleString('en-US', options)}</span></h1>
            <Link to={`/hackathons/submissions/${submission.id}`} className={`${styledBorder} bg-MVP-yellow h-full ml-auto text-[#161616] text-center font-gilroy text-[1.2rem] font-extrabold flex items-center justify-center`}>
              Review Submission
            </Link>
          </div>
          : null}
          <div className="flex">
            {/* Event Details Left*/}
            
            <div className="px-6 flex flex-col justify-between w-3/4">
              {eventState()}
              <h1 className="text-3xl md:text-6xl font-gilroy mt-8 font-bold">{event.title}</h1>
              <DetailCard text={event.skillLevel} />
              <p className="font-poppins">{event.basicProjectSummary}</p>
              <section aria-labelledby="themes">
                <h2 id="themes" className="font-bold font-gilroy text-3xl my-3">Themes & Disciplines</h2>
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
            { !joinedEvents.includes(eventId) ?
              <Link to={`/join-event/${eventId}`} className={`${styledBorder} !py-[0.7rem] !px-[0.5rem] flex items-center justify-center font-gilroy text-[1.6rem] font-semibold bg-MVP-light-blue`}>
                    Join Event
              </Link>
              :
              <EventPageStatusTag userRole="normal" 
              
                eventStatus={
                  ((status === "not started" && joinedEvents.includes(eventId)) ? 'joined' :
                  (status === "ongoing" ? "ongoing" : 
                  (status === "ended" ? "ended" : null)))
                } 
              />
              }
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
          <section className="w-3/4 px-6 pt-8">
            <div className="flex justify-start gap-8">
              <div className="flex gap-3 items-center">
                <h3 className="font-bold font-gilroy text-2xl my-3">Registrants</h3>
                {submissions.length === 0 ?
                <span>(20 /{event.maxParticipants + 20})</span>
                :
                <span>({formattedUserNames.length} / {event.maxParticipants})</span>
                }
              </div>
              {submissions.length === 0 ?
                <button className={`${STYLES.primaryButton} bg-MVP-white border-MVP-light-gray text-MVP-light-gray rounded-[10px] flex items-center disabled:cursor-not-allowed`} disabled>
                  Export Registrants List
                </button>
                : <ExportButton data={exportData} fields={exportFields} />
                }
            </div>
            <div className="flex flex-col">
              <StackedProfiles />
              {formattedUserNames.length ?
                <p className="font-poppins mt-12">{`${formattedUserNames[0]}, ${formattedUserNames[1]}, and ${formattedUserNames.length-2} others`}</p>
                :
                <p className="font-poppins mt-12">Michele Li, Max K and 18 others</p>
              }
            </div>
          </section>
          <section className="w-3/4 px-6 space-y-8">
            <div className="mt-16">
              <h2 className="text-5xl font-bold font-gilroy">Challenge Details</h2>
              <div className="flex gap-2 items-center mt-4">
                {status === "not started" && <h3 className="font-gilroy text-lg">Challenge details will appear here when the Event begins.</h3>}
              </div>
            </div>
            { status !== "not started" &&
              <>
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
            </>
            }
          </section>

        </section>
      </div>
      {/* Banner */}
      {(status === "ongoing" && !countdownEndEnded) &&
        <section className="h-[100px] z-50  w-full fixed bottom-0 px-32 border-t-[3px] border-MVP-black bg-MVP-white flex justify-between items-center">
          <div className="flex gap-2 ">
            <img className="h-6" src={Clock} alt="clock icon" />
            <p className="font-gilroy font-bold">Time left to submit: {countTimeEnd}</p>
          </div>
          <button className={`${STYLES.primaryButton} rounded-[10px] w-auto`} aria-label="Submit Project">
            <Link to={`/event/${eventId}/submit`} >Submit Project</Link>
          </button>
        </section>
      }
    </main>)
}


export default EventPage
