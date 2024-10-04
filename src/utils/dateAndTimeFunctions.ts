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

  const daysRemaining = Math.floor(
    (eventStartTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (currentTime < eventStartTime) {
    return {
      text: `In ${daysRemaining} days`,
      style: "border-2	border-MVP-black bg-MVP-white text-MVP-black", // Default style
    };
  } else if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
    return {
      text: "On-going",
      style: "bg-yellow-500 text-black", // Active style
    };
  } else {
    return {
      text: "Event-ended",
      style: "bg-MVP-gray text-MVP-white", // Inactive style
    };
  }
};
