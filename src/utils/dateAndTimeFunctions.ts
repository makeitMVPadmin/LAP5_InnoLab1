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

export function calculateDuration(
  startTime: string | number | Date,
  endTime: string | number | Date
) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMs = end.getTime() - start.getTime();

  const hours = Math.ceil(durationMs / (1000 * 60 * 60));

  if (hours <= 24) {
    return `24 hrs`;
  } else if (hours < 48) {
    return `${hours} hrs`;
  } else {
    const days = Math.ceil(hours / 24);
    return `${days} day(s)`;
  }
}

export function countDown(
  startTime: string | number | Date,
  eventType: string
) {
  const countDownDate = new Date(startTime).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  if (days === 0) {
    return `${hours}h till begin`;
  } else if (1 < days && days < 2) {
    return `${days} days till begin`;
  } else if (2 < days && days < 3) {
    return `${days} days till begin`;
  } else {
    return `${eventType}`;
  }
}
