import { z } from "zod";

export const submissionSchema = z.object({
  teamName: z
    .string()
    .min(1, { message: "Team name is required." })
    .max(80, { message: "Max 80 characters has been reached" }),
  techStack: z
    .string()
    .min(1, { message: "Tech stack is required." })
    .max(80, { message: "Max 80 characters has been reached" }),
  designTools: z
    .string()
    .min(1, { message: "Design tools are required." })
    .max(80, { message: "Max 80 characters has been reached" }),
  problemStatement: z
    .string()
    .min(1, { message: "Problem statement is required." })
    .max(500, { message: "Max 500 characters has been reached" }),
  projectChallenge: z
    .string()
    .min(1, { message: "Project challenge is required." })
    .max(500, { message: "Max 500 characters has been reached" }),
  designFeatures: z
    .string()
    .min(1, { message: "Design features are required." })
    .max(500, { message: "Max 500 characters has been reached" }),
  designImpact: z
    .string()
    .min(1, { message: "Design impact is required." })
    .max(500, { message: "Max 500 characters has been reached" }),
  nextSteps: z
    .string()
    .min(1, { message: "Next steps are required." })
    .max(500, { message: "Max 500 characters has been reached" }),
  imageFile: z.instanceof(File).refine((file) => !!file, {
    message: "File is required.",
  }),
  projectLinks: z
    .array(
      z.object({
        url: z.string().url({ message: "Invalid URL format." }), // Ensure the string is a valid URL
      })
    )
    .min(1, { message: "A project link is required." }) // At least one link is required
    .refine((links) => links[0]?.url?.length > 0, {
      message: "The first project link is required.",
      path: [0, "url"],
    }),
  teamMembers: z
    .array(
      z.object({
        name: z.string().optional(),
        role: z.string().optional(),
      })
    )
    .refine((members) => members.length > 0, {
      message: "At least one team member is required.",
    })
    .refine(
      (members) =>
        members.every(
          (member) =>
            (!member.name && !member.role) || (member.name && member.role)
        ),
      { message: "Each team member must have both a name and a role." }
    ),
  eventId: z.string(),
  userId: z.string(),
});
