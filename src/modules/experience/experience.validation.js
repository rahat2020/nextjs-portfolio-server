import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z
    .string({ required_error: "Company name is required" })
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name cannot exceed 200 characters")
    .trim(),
  position: z
    .string({ required_error: "Position is required" })
    .min(2, "Position must be at least 2 characters")
    .trim(),
  description: z.string().optional().default(""),
  location: z.string().trim().optional().default(""),
  startDate: z.coerce.date({ required_error: "Start date is required" }),
  endDate: z.coerce.date().optional().nullable().default(null),
  isCurrentlyWorking: z.boolean().optional().default(false),
  technologies: z.array(z.string().trim()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
});

export const updateExperienceSchema = createExperienceSchema.partial();
