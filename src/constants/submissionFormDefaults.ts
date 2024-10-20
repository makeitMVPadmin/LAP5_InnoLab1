import { ProjectSubmissionFormValues } from "../types/submissionTypes";

export const DEFAULT_FORM_VALUES: ProjectSubmissionFormValues = {
  title: "",
  teamName: "",
  techStack: "",
  designTools: "",
  problemStatement: "",
  projectChallenge: "",
  designFeatures: "",
  designImpact: "",
  nextSteps: "",
  imageFiles: [],
  pdfFiles: [],
  projectLinks: [{ url: "" }],
  teamMembers: [{ name: "", role: "Software developer" }],
  eventId: "",
  userId: "",
};
