import { z } from "zod";
import { submissionSchema } from "../schema/submissionSchema";
interface TeamMember {
  name?: string;
  role?: string;
}

interface ProjectLink {
  url?: string;
}

export interface ProjectSubmissionFormValues
  extends z.infer<typeof submissionSchema> {
  teamName: string;
  techStack: string;
  designTools: string;
  problemStatement: string;
  projectChallenge: string;
  designFeatures: string;
  designImpact: string;
  nextSteps: string;
  imageFile: File | null;
  projectLinks: ProjectLink[];
  teamMembers: TeamMember[];
}

export interface ProjectSubmission extends ProjectSubmissionFormValues {
  eventId: string;
  userId: string;
}
