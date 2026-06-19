import { Router } from "express";
import PostController from "./post.controller.js";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { createPostSchema, updatePostSchema } from "./post.validation.js";

const router = Router();

// Public routes
router.get("/", PostController.getAll);
router.get("/:slug", PostController.getBySlug);

// Protected routes (admin only)
router.post("/", auth, validate(createPostSchema), PostController.create);
router.patch("/:id", auth, validate(updatePostSchema), PostController.update);
router.delete("/:id", auth, PostController.delete);

export default router;
