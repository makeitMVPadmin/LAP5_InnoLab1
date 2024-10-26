import PulsingAnimation from "../PulsingAnimation/PulsingAnimation";

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

    if (eventStatus === 'ongoing') {
        displayText = 'On-going';
    } else if (eventStatus === 'ended') {
        displayText = 'Event Ended';
        textColor = 'text-MVP-gray';
        backgroundColor = 'bg-MVP-light-gray';
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
        <div className={`flex justify-center gap-4 rounded-full px-6 ${backgroundColor} max-w-52 items-center h-12`}>
            <div className="basis-8">
                {eventStatus === 'ongoing' && <PulsingAnimation />}
            </div>
            <p className={`font-bold font-gilroy text-xl flex-grow ${textColor}`}>{displayText}</p>
        </div>
    );
}

export default EventPageStatusTag