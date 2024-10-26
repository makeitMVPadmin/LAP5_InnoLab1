import PulsingAnimation from "../components/PulsingAnimation/PulsingAnimation";
export function convertToTimeZone(
  isoString: string | number | Date,
  timeZoneAbbreviation: string
) {
  const timeZoneMap = {
    EST: "America/New_York",
    PST: "America/Los_Angeles",
    CST: "America/Chicago",
    MST: "America/Denver",
  };

  const timeZone = timeZoneMap[timeZoneAbbreviation] || "UTC";

  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}


export const convertDate = (startDate: string, startTime: string, timezone: string) => {
  if (!startDate || !startTime) return { date: '', time: '' };

  const date = new Date(startDate);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  // Format the time
  const formattedTime = timezone?.startsWith('GMT')
    ? startTime
    : new Date(`${startDate}T${startTime}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

  return {
    date: formattedDate,
    time: `${formattedTime} ${timezone || ''}`
  };
};

export const getEventStatus = (
  startTime: string | Date,
  endTime: string | Date
) => {
  const currentTime = new Date();
  const eventStartTime = new Date(startTime);
  const eventEndTime = new Date(endTime);

  const timeDifferenceInMs = eventStartTime.getTime() - currentTime.getTime();
  const hoursRemaining = Math.floor(timeDifferenceInMs / (1000 * 60 * 60));
  const daysRemaining = Math.floor(
    (eventStartTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (currentTime < eventStartTime) {
    if (hoursRemaining < 25) {
      return {
        text: `In ${hoursRemaining} hours`,
        style: "border-2 border-MVP-black bg-MVP-white text-MVP-black", // Style for event starting within 25 hours
      };
    } else {
      return {
        text: `In ${daysRemaining} days`,
        style: "border-2 border-MVP-black bg-MVP-white text-MVP-black", // Default style
      };
    }
  } else if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
    return {
      text: "On-going",
      style: "border-2 border-MVP-black bg-MVP-yellow", // Active style
      image: PulsingAnimation,
    };
  } else {
    return {
      text: "Event-ended",
      style: "bg-MVP-gray text-MVP-white", // Inactive style
    };
  }
};
