type EventType = {
  basicProjectSummary: string;
  createdAt: string;
  disciplines: string[];
  email: string;
  endTime: string;
  firstName: string;
  fullDetails: string[];
  imageUrl: string;
  judges: string[];
  lastName: string;
  meetingLink: string;
  participantCount: number;
  skillLevel: string;
  startTime: string;
  themes: string[];
  timeZone: string;
  title: string;
};

export const sortEventsByStartTime = (eventsArray: Array<EventType>) => {
  return eventsArray.sort((a, b) => {
    const startTimeA = new Date(a.startTime);
    const startTimeB = new Date(b.startTime);

    if (isNaN(startTimeA.getTime()) || isNaN(startTimeB.getTime())) {
      return 0;
    }

    return startTimeA.getTime() - startTimeB.getTime();
  });
};
