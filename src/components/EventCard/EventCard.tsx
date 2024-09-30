import { convertToTimeZone, calculateDuration, countDown } from "../../utils/dateAndTimeFunctions";
import HeartIcon from "../../assets/images/heart.png";
import { v4 as uuidv4 } from 'uuid';
import "./EventCard.scss";

interface EventCardProps {
    title: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    skillLevel: string;
    imageUrl: string;
    themes: string[];
}

const EventCard: React.FC<EventCardProps> = ({ title, startTime, endTime, timeZone, skillLevel, themes, imageUrl }) => {
    const formattedDate = `${convertToTimeZone(startTime, timeZone)} ${timeZone}`;
    const eventDuration = calculateDuration(startTime, endTime);

    const themesWithIds = themes.map((theme) => ({
        id: uuidv4(),
        name: theme,
    }));

    return (
        <article className="event-card__container">
            <section className="event-card__image" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="event-card__wrapper">
                    <div className="event-card__top-tags">
                        <span className="event-card__tag ">{countDown(startTime, "Online")}</span>
                        <span className="event-card__tag ">{eventDuration}</span>
                    </div>
                    <div className="event-card__bottom-tags">
                        <div className="event-card__bottom-wrapper">
                            <span className="event-card__tag ">{skillLevel}</span>
                        </div>
                        <div className="event-card__favorite">
                            <img className="event-card__favorite-icon" src={HeartIcon} alt="favorite icon" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="event-card__details-container">
                <div className="event-card__details">
                    <h3 className="event-card__title">{title}</h3>
                    <p className="event-card__date">{formattedDate}</p>
                    <div className="event-card__theme-container">
                        {themesWithIds.map((theme) => (
                            <span className="event-card__theme-tag" key={theme.id}>{theme.name}</span>
                        ))}
                    </div>
                </div>
                <button className="event-card__button" type="button" aria-label="View Event"><span className="event-card__button-text">View Event</span></button>
            </section>
        </article >
    )
}

export default EventCard;