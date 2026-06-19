import { Router } from "express";
import ProjectController from "./project.controller.js";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { createProjectSchema, updateProjectSchema } from "./project.validation.js";

const router = Router();

// Public routes
router.get("/", ProjectController.getAll);
router.get("/:slug", ProjectController.getBySlug);

// Protected routes (admin only)
router.post("/", auth, validate(createProjectSchema), ProjectController.create);
router.patch("/:id", auth, validate(updateProjectSchema), ProjectController.update);
router.delete("/:id", auth, ProjectController.delete);

export default router;
