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
  teamName: string;
  techStack: string;
  designTools: string;
  problemStatement: string;
  projectChallenge: string;
  designFeatures: string;
  designImpact: string;
  nextSteps: string;
  projectFiles: File[] | null;
  pdfFiles: File[] | null;
  projectLinks: ProjectLink[];
  teamMembers: TeamMember[];
}

export interface ProjectSubmission extends ProjectSubmissionFormValues {
  eventId: string;
  userId: string;
}
