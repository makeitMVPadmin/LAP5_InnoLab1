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

export const convertToUTC = (date: string, time: string, gmtOffset: string): string => {
  const dateTimeString = `${date}T${time}:00`;
  
  const localDateTime = new Date(dateTimeString + gmtOffset);

  return localDateTime.toISOString().slice(0, -5) + "Z";
};


export const getTimeZoneFromOffset = (offset: string) => {
    const timeZoneMap = {
        'GMT-0500': 'EST',
        'GMT-0600': 'CST',
        'GMT-0700': 'MST',
        'GMT-0800': 'PST',
    };

    return timeZoneMap[offset];
}


