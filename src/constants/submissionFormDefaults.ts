import { ProjectSubmissionFormValues } from "../types/submissionTypes";

export const DEFAULT_FORM_VALUES: ProjectSubmissionFormValues = {
  teamName: "",
  techStack: "",
  designTools: "",
  problemStatement: "",
  projectChallenge: "",
  designFeatures: "",
  designImpact: "",
  nextSteps: "",
  projectFiles: [],
  projectLinks: [],
  teamMembers: [{ name: "", role: "Software developer" }],
  eventId: "",
  userId: "",
};
