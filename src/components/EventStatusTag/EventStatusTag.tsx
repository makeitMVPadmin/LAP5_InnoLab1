import { getEventStatus } from "../../utils/dateAndTimeFunctions"
import PulsingAnimation from "../PulsingAnimation/PulsingAnimation";

const EventStatusTag = ({ startTime, endTime }) => {
  const { text, style, image } = getEventStatus(startTime, endTime);

  return (
    <span
      className={`flex items-center justify-center px-4 py-1 font-gilroy font-extrabold h-[1.6169rem] rounded-full ${style}`}
    >
      {image && <PulsingAnimation />}
      {text}
    </span>
  );
};

export default EventStatusTag;
