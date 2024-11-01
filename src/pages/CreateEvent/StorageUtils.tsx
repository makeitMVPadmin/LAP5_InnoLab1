interface EventFormInputs {
  title: string;
  organizer: string;
  basicProjectSummary: string;
  skillLevel: string;
  disciplines: string[];
  themes: string[];
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timeZone: string;
  meetingLink: string;
  minParticipants: number;
  maxParticipants: number;
  judges: { firstName: string; lastName: string }[];
  file: File
}

interface ChallengeDetailsInputs {
  additionalInformation: string;
  challengeReleaseDate: string;
  challengeReleaseTime: string;
  constraints: string;
  evaluationCriteria: string;
  objectivesGoals: string;
  problemStatement: string;
}

type FormData = EventFormInputs | ChallengeDetailsInputs;

export const saveFormData = (key: string, data: FormData) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFormData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const clearFormData = (key: string) => {
  localStorage.removeItem(key);
};

