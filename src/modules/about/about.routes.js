import { Router } from "express";
import AboutController from "./about.controller.js";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { createAboutSchema, updateAboutSchema } from "./about.validation.js";

const router = Router();

// ── Public Routes ──────────────────────────────────────────────────────────
/** GET /api/v1/about  — Retrieve the portfolio owner's about info */
router.get("/", AboutController.get);

// ── Protected Routes (Admin only) ─────────────────────────────────────────
/** POST /api/v1/about  — Create about info for the first time */
router.post("/", auth, validate(createAboutSchema), AboutController.create);

/** PATCH /api/v1/about — Partial update */
router.patch("/", auth, validate(updateAboutSchema), AboutController.update);

/** PUT /api/v1/about   — Full replace */
router.put("/", auth, validate(updateAboutSchema), AboutController.replace);

/** DELETE /api/v1/about — Delete the about info document */
router.delete("/", auth, AboutController.delete);

export default router;
