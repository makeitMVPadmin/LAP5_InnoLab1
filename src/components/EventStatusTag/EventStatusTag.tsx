import { getEventStatus } from "../../utils/dateAndTimeFunctions"

const EventStatusTag = ({ startTime, endTime }) => {
  const { text, style } = getEventStatus(startTime, endTime);

  return (
    <span
      className={`flex items-center justify-center px-4 py-1 font-gilroy h-[1.6169rem] rounded-full ${style}`}
    >
      {text}
    </span>
  );
};

export default EventStatusTag;
