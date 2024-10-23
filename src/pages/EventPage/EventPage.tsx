import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchHackathonEvents } from "../../Firebase/FirebaseQueries";
import { HackathonEventType } from "../../Firebase/FirebaseQueries";
import { STYLES } from "../../constants/styles";
import Header from "../../components/Header/Header";
import DetailCard from "../../components/DetailCard/DetailCard";
import ParticipantInfoChip from "../../components/ParticipantInfoChip/ParticipantInfoChip";
import StackedProfiles from "../../components/StackedProfiles/StackedProfiles";
import Clock from "../../assets/images/clockIcon.svg";
import useEventData from "../../hooks/usEventData";
import ExportButton from "../../components/ExportButton/ExportButton";
import calender from "../../assets/images/calender.png";
import location from "../../assets/images/location.png";
import link from "../../assets/images/link.png";
import ongoing from "../../assets/images/ongoing.png";

const EventPage = () => {
  const [event, setEvent] = useState<HackathonEventType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    submissions,
    participantCount,
    formattedUserNames,
    exportData,
    exportFields,
  } = useEventData(eventId);

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
          console.log(event);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  const formatThemes = [
    ...(event?.themes || []),
    ...(event?.disciplines || []),
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const formatDate = (isoString, timeZone) => {
    const optionsDate: Intl.DateTimeFormatOptions = {
      timeZone,
      weekday: "long",
      month: "short",
      day: "numeric",
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(isoString);
    const formattedDate = date.toLocaleString("en-US", optionsDate);
    const formattedTime = date.toLocaleString("en-US", optionsTime);

    return { formattedDate, formattedTime };
  };

  const { formattedDate: startDate, formattedTime: startTime } = formatDate(
    event.startTime,
    event.timeZone
  );
  const { formattedDate: endDate, formattedTime: endTime } = formatDate(
    event.endTime,
    event.timeZone
  );

  return (
    <main className="w-full  relative bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat">
      <Header handleClick={() => navigate(-1)} />
      <div className="w-full max-w-[1130px] h-full flex flex-col m-auto pb-32">
        <div className="h-72 w-full bg-cover m-auto">
          <img
            className="h-full w-full object-cover"
            src={event.imageUrl}
            alt={`hero for ${event.title}`}
          />
        </div>
        <section className="gap-6 space-y-6">
          <div className="flex">
            {/* Event Details Left*/}
            <div className="px-6 flex flex-col gap-6 w-3/4">
              <div className="flex items-center gap-2 mt-8" role="alert">
                <img
                  className="h-4"
                  src={Clock}
                  alt="Clock icon indicating time remaining"
                />
                <span className="font-gilroy text-xl">
                  Event Starts in: 10h 55m 55s
                </span>
              </div>
              <h1 className="text-3xl md:text-6xl font-gilroy mt-8">
                {event.title}
              </h1>
              <DetailCard text={event.skillLevel} />
              <p className="font-poppins">{event.basicProjectSummary}</p>
              <section aria-labelledby="themes">
                <h2 id="themes" className="font-bold font-gilroy text-3xl my-3">
                  Themes
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {formatThemes.map((theme, index) => (
                    <DetailCard key={index} text={theme} />
                  ))}
                </div>
              </section>
              <section aria-labelledby="judges">
                <h2 id="judges" className="font-bold font-gilroy text-3xl my-3">
                  Judges
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {event.judges.map((judge, index) => (
                    <ParticipantInfoChip
                      key={index}
                      integer={index}
                      fullName={judge}
                      role="Software Developer"
                    />
                  ))}
                </div>
              </section>
            </div>
            {/* Event Details Right*/}
            <div>
              <section className="p-8 font-poppins font-semibold">
                <article className="flex items-center border border-green-500 bg-green-500 w-fit px-4 py-1 rounded-full">
                  <img className="w-5" src={ongoing} alt="Ongoing" />
                  <p className="pl-2">On-going</p>
                </article>
                <p>Organized by</p>
                <div className="flex gap-3 flex-wrap">
                  {event.judges.map((judge, index) => (
                    <ParticipantInfoChip
                      key={index}
                      integer={index}
                      fullName={judge}
                      role="Software Developer"
                    />
                  ))}
                </div>
                <p>Starts:</p>
                <div className="flex items-center">
                  <img src={calender} className="w-5 h-5" alt="Calendar" />
                  <div className="pl-2 text-sm">
                    <p>{startDate}</p>
                    <p>
                      {startTime} {event.timeZone}
                    </p>
                  </div>
                </div>
                <p>Ends:</p>
                <div className="flex items-center">
                  <img src={calender} className="w-5 h-5" alt="Calendar" />
                  <div className="pl-2 text-sm">
                    <p>{endDate}</p>
                    <p>
                      {endTime} {event.timeZone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={location} className="w-5 h-5" alt="Location" />
                  <p className="pl-2 text-sm">Location: Online</p>
                </div>

                <Link to={event.meetingLink}>
                  <button
                    type="button"
                    className="flex items-center justify-center w-[10.5rem] h-[2.75rem] bg-MVP-light-blue border-[3px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-MVP-black rounded-[0.625rem] text-[1.25rem] font-gilroy cursor-pointer"
                    aria-label="Event link"
                  >
                    <img src={link} className="w-5" alt="Event Link" />
                    <span>Event Link</span>
                  </button>
                </Link>
              </section>
            </div>
          </div>
          <section className="w-3/4 px-6 ">
            <div className="flex justify-start gap-8">
              <div className="flex gap-3 items-center">
                <h3 className="font-bold font-gilroy text-2xl my-3">
                  Registrants
                </h3>
                <span>
                  ({submissions.length}/{participantCount})
                </span>
              </div>
              <ExportButton data={exportData} fields={exportFields} />
            </div>
            <div className="flex flex-col">
              <StackedProfiles />
              <p className="font-poppins mt-12">{formattedUserNames}</p>
            </div>
          </section>
          <section className="w-3/4 px-6 ">
            <section className="event-details-bottom">
              <h2 className="event-details-bottom__title">Challenge Details</h2>
              <div className="event-details-bottom__wrapper">
                <h3 className="event-details-bottom__subtitle">
                  Problem Statement
                </h3>
                <p className="event-details-bottom__txt">
                  The healthcare industry faces challenges in delivering
                  efficient, accurate, and scalable patient care. Current
                  diagnostic tools, care systems, and health data management
                  struggle with limitations in accessibility, accuracy, and
                  timely response. AI-powered technologies have the potential to
                  revolutionize these areas, but innovative solutions are needed
                  to address specific gaps in diagnostics, patient care, and
                  health data usage to improve outcomes.
                </p>
              </div>
              <div className="event-details-bottom__wrapper">
                <h3 className="event-details-bottom__subtitle">
                  Objective/Goals
                </h3>
                <ul>
                  <li>
                    1. Innovate AI-powered solutions: Develop novel AI tools
                    that enhance healthcare diagnostics and improve patient
                    care.
                  </li>
                  <li>
                    2. Optimize health data usage: Create systems to better
                    manage, analyze, and utilize health data for clinical
                    decision-making and improved patient outcomes.
                  </li>
                  <li>
                    3. Collaborate effectively: Foster teamwork and
                    cross-disciplinary collaboration to produce holistic,
                    integrated solutions over the course of the hackathon.
                  </li>
                </ul>
              </div>
              <div className="event-details-bottom__wrapper">
                <h3 className="event-details-bottom__subtitle">
                  Constraints/Limitations
                </h3>
                <ul>
                  <li>
                    1. Scope limitation: Solutions should focus on specific
                    healthcare challenges, such as diagnostics, patient care, or
                    health data management, rather than attempting to address
                    broad or multiple issues.
                  </li>
                  <li>
                    2. Technical limitations: AI solutions need to consider data
                    privacy regulations like HIPAA and should avoid violating
                    patient confidentiality.
                  </li>
                </ul>
              </div>
              <div className="event-details-bottom__wrapper">
                <h3 className="event-details-bottom__subtitle">
                  Evaluation Criteria
                </h3>
                <ul>
                  <li>
                    1. Innovation and Creativity: The degree to which the
                    solution introduces new or unique approaches to solving
                    healthcare problems.
                  </li>
                  <li>
                    2. Impact on Healthcare: How significantly the proposed
                    solution improves diagnostics, patient care, or the use of
                    health data.{" "}
                  </li>
                  <li>
                    3. Technical Feasibility: The technical soundness and
                    scalability of the AI solution in real-world healthcare
                    settings.
                  </li>
                  <li>
                    4. Presentation and Communication: Clarity and effectiveness
                    in presenting the problem, solution, and its potential
                    impact..{" "}
                  </li>
                </ul>
              </div>
              <div className="event-details-bottom__wrapper">
                <h3 className="event-details-bottom__subtitle">
                  Additional Information
                </h3>
                <p>
                  Post-hackathon Support: Selected projects may be considered
                  for continued development through partnerships with healthcare
                  organizations or incubators.
                </p>
              </div>
            </section>
          </section>
        </section>
      </div>
      <section className="h-[100px] w-full fixed bottom-0 px-8 border-t-[3px] border-MVP-black bg-MVP-white flex justify-between items-center">
        <div className="flex gap-2 ">
          <img className="h-6" src={Clock} alt="clock icon" />
          <p className="font-gilroy">Time left to submit: 50m:15s</p>
        </div>
        <button
          className={`${STYLES.primaryButton} rounded-[10px] w-auto`}
          aria-label="Submit Project"
        >
          <Link to={`/event/${eventId}/submit`}>Submit Project</Link>
        </button>
      </section>
    </main>
  );
};

export default EventPage;
