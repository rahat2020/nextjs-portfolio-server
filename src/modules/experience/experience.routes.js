import { Router } from "express";
import ExperienceController from "./experience.controller.js";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { createExperienceSchema, updateExperienceSchema } from "./experience.validation.js";

const router = Router();

// Public routes
router.get("/", ExperienceController.getAll);
router.get("/:slug", ExperienceController.getBySlug);

// Protected routes (admin only)
router.post("/", auth, validate(createExperienceSchema), ExperienceController.create);
router.patch("/:id", auth, validate(updateExperienceSchema), ExperienceController.update);
router.put("/:id", auth, validate(updateExperienceSchema), ExperienceController.update);
router.delete("/:id", auth, ExperienceController.delete);

export default router;
