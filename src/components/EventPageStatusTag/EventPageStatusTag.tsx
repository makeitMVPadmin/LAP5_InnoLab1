import PulsingAnimation from "../PulsingAnimation/PulsingAnimation";
import { ReactComponent as CircleCheckmark } from "../../assets/images/circlewithcheckmark.svg";
import { ReactComponent as CrossCalendar } from "../../assets/images/cross-calendar.svg";

type UserRole = 'normal' | 'admin';
type EventStatus = 'not-joined' | 'joined' | 'ongoing' | 'ended';

interface Props {
    userRole: UserRole;
    eventStatus: EventStatus;
}

const EventPageStatusTag: React.FC<Props> = ({ userRole, eventStatus }) => {
    let displayText = '';
    let textColor = 'text-MVP-black';
    let backgroundColor = 'bg-MVP-green';
    let svgColor = '';

    if (eventStatus === 'ongoing') {
        displayText = 'On-going';
    } else if (eventStatus === 'ended') {
        displayText = 'Event Ended';
        textColor = 'text-MVP-gray';
        backgroundColor = 'bg-MVP-light-gray';
        svgColor = 'fill-MVP-gray';
    } else if (userRole === 'admin') {
        displayText = 'Event Published';
    } else if (userRole === 'normal' && eventStatus === 'joined') {
        displayText = 'Joined';
    }

    // Hide the component if the user is normal and has not joined
    if (userRole === 'normal' && eventStatus === 'not-joined') {
        return null;
    }

    return (
        <div className={`flex justify-center gap-4 rounded-full px-10 ${backgroundColor} items-center h-12 self-start`}>
            <div className="basis-8">
                {eventStatus === 'ongoing' && <PulsingAnimation />}
                {eventStatus === 'joined' && <CircleCheckmark className="h-5"/>}
                {eventStatus === 'ended' && <CrossCalendar className={`h-5 ${svgColor}`}/>}
            </div>
            <p className={`font-bold font-gilroy text-xl whitespace-nowrap ${textColor}`}>{displayText}</p>
        </div>
    );
}

export default EventPageStatusTag