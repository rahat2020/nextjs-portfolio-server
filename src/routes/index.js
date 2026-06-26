import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import postRoutes from "../modules/post/post.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import experienceRoutes from "../modules/experience/experience.routes.js";
import uploadRoutes from "../modules/upload/upload.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";
import aboutRoutes from "../modules/about/about.routes.js";

const router = Router();

// Module routes
router.use("/auth", authRoutes);
router.use("/about", aboutRoutes);
router.use("/posts", postRoutes);
router.use("/projects", projectRoutes);
router.use("/experiences", experienceRoutes);
router.use("/uploads", uploadRoutes);
router.use("/notifications", notificationRoutes);

export default router;
