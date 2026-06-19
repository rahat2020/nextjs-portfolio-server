import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),
  content: z
    .string({ required_error: "Content is required" })
    .min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string().trim()).optional().default([]),
  category: z.string().trim().optional().default("uncategorized"),
  isPublished: z.boolean().optional().default(false),
});

export const updatePostSchema = createPostSchema.partial();
