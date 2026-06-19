import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import postRoutes from "../modules/post/post.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import experienceRoutes from "../modules/experience/experience.routes.js";

const router = Router();

// Module routes
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/projects", projectRoutes);
router.use("/experiences", experienceRoutes);

export default router;
