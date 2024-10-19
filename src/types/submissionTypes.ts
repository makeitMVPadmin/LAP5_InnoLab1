import { z } from "zod";
import { submissionSchema } from "../schema/submissionSchema";

export interface TeamMember {
  name?: string;
  role?: string;
}

export interface ProjectLink {
  url?: string;
}

export interface SectionProps {
  title: string;
  children: React.ReactNode;
  editButton: React.ReactNode;
  required?: boolean;
}

export interface ProjectSubmissionFormValues
  extends z.infer<typeof submissionSchema> {
  title: string,
  teamName: string;
  techStack: string;
  designTools: string;
  problemStatement: string;
  projectChallenge: string;
  designFeatures: string;
  designImpact: string;
  nextSteps: string;
  imageFiles: File[] | null;
  projectLinks: ProjectLink[];
  teamMembers: TeamMember[];
}

export interface ProjectSubmission extends ProjectSubmissionFormValues {
  eventId: string;
  userId: string;
}
