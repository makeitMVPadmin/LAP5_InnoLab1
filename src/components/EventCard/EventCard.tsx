import { useState } from "react";
import { convertToTimeZone } from "../../utils/dateAndTimeFunctions";
import { v4 as uuidv4 } from 'uuid';
import HeartIconActive from "../../assets/images/favorite-icon-active.svg"
import HeartIconInactive from "../../assets/images/favorite-icon-inactive.png"
import EventStatusTag from '../EventStatusTag/EventStatusTag';


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
    const [isFavorite, setIsFavorite] = useState(false);

    const themesWithIds = themes.map((theme) => ({
        id: uuidv4(),
        name: theme,
    }));

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    const tagStyle = "flex items-center justify-center px-4 font-gilroy h-7 rounded-full"
    return (
        <article className="flex flex-col w-[20.3125rem] h-[34.5625rem]">
            <section className="relative h-[18.4375rem] border-[3px] border-MVP-black rounded-[24.2px] bg-cover bg-center w-full" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="relative p-[1.0625rem_0.8125rem] h-full">
                    <div className="absolute flex gap-2 flex-wrap top-3 right-2.5">
                        <span className={`${tagStyle} bg-MVP-black text-white`}>Joined</span>
                        <EventStatusTag startTime={startTime} endTime={endTime} />
                    </div>
                    <div className="absolute flex items-end justify-between flex-wrap bottom-[1.0625rem] w-[92%]">

                        <span className={`${tagStyle} border-MVP-black bg-MVP-white text-MVP-black border-2	`}>{skillLevel}</span>
                        <div className="flex items-center justify-center w-[2.8rem] h-[2.8rem] rounded-full" onClick={handleFavorite}>
                            <img className="w-full h-full" src={isFavorite ? HeartIconActive : HeartIconInactive} alt="favorite icon" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-between pt-4 gap-4 flex-1 font-poppins">
                <div className="flex flex-col gap-4">
                    <h3 className="text-[1.5625rem] font-bold overflow-hidden text-ellipsis">{title}</h3>
                    <p className="text-[1.125rem] font-semibold">{formattedDate}</p>
                    <div className="flex flex-wrap gap-2 text-[1rem] leading-none">
                        {themesWithIds.map((theme) => (
                            <span key={theme.id} className="bg-MVP-white text-MVP-black gap-1 font-poppins h-[1.6169rem] leading-4">{theme.name}</span>
                        ))}
                    </div>
                </div>
                <button type="button" className="flex items-center justify-center w-[12.625rem] h-[3.9375rem] bg-MVP-light-blue border-[3px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-MVP-black rounded-[0.625rem] text-[1.6875rem] font-gilroy cursor-pointer" aria-label="View Event">
                    <span>View Event</span>
                </button>
            </section>
        </article>
    )
}

export default EventCard;
