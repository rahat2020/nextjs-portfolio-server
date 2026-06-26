import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""));

export const createAboutSchema = z.object({
  // Personal Identity
  full_name: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .trim(),
  short_name: z.string().max(50).trim().optional().or(z.literal("")),
  job_title: z.string().max(150).trim().optional().or(z.literal("")),
  avatar: optionalUrl,
  resume_url: optionalUrl,

  // Contact
  email: z.string().email("Must be a valid email address").optional().or(z.literal("")),
  phone: z.string().max(30).trim().optional().or(z.literal("")),
  location: z.string().max(150).trim().optional().or(z.literal("")),

  // Header / Hero Section
  header_title: z.string().max(200).trim().optional().or(z.literal("")),
  header_description: z.string().optional().or(z.literal("")),

  // About Section
  about_title: z.string().max(200).trim().optional().or(z.literal("")),
  about_description: z.string().optional().or(z.literal("")),

  // Social Links
  linkedin_title: z.string().trim().optional().or(z.literal("")),
  linkedin_link: optionalUrl,
  facebook_link: optionalUrl,
  twitter_link: optionalUrl,
  instagram_link: optionalUrl,
  whatsapp_link: optionalUrl,
  github_link: optionalUrl,
  youtube_link: optionalUrl,
  website_link: optionalUrl,

  // Extra / Meta
  years_of_experience: z.number().nonnegative().optional().default(0),
  projects_completed: z.number().nonnegative().optional().default(0),
  open_to_work: z.boolean().optional().default(true),
  skills: z.array(z.string().trim()).optional().default([]),
  meta_title: z.string().trim().optional().or(z.literal("")),
  meta_description: z.string().optional().or(z.literal("")),
});

export const updateAboutSchema = createAboutSchema.partial();
