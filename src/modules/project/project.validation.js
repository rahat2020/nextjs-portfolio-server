import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Live URL must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("GitHub URL must be a valid URL").optional().or(z.literal("")),
  technologies: z.array(z.string().trim()).optional().default([]),
  category: z.string().trim().optional().default("web"),
  isFeatured: z.boolean().optional().default(false),
  isPublished: z.boolean().optional().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();
