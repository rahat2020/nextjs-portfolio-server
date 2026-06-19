import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const createAdminSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .trim()
    .optional()
    .default("Admin"),
});

export const updateAdminSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
});
