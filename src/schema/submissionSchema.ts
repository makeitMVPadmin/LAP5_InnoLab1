import { z } from "zod";

export const submissionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title of project required." })
    .max(80, { message: "Max 80 characters has been reached" }),
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
  imageFiles: z
    .array(
      z.instanceof(File).refine((file) => !!file, {
        message: "File is required.",
      })
    )
    .min(1, { message: "At least one file is required." })
    .max(3),
  projectLinks: z
    .array(
      z.object({
        url: z
          .string()
          .refine(
            (value) => {
              // Check if it already starts with http or https
              return (
                /^(http|https):\/\//.test(value) ||
                /^[\w-]+\.[\w-]+/.test(value)
              );
            },
            { message: "Invalid URL format. Please include a valid domain." }
          )
          .transform((value) => {
            // If the URL doesn't start with http or https, prepend https://
            if (!/^(http|https):\/\//.test(value)) {
              return `https://${value}`;
            }
            return value;
          }),
      })
    )
    .min(1, { message: "At least one project link is required." }),
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
