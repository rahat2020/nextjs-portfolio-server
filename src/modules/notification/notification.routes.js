import { Router } from "express";
import NotificationController from "./notification.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

// All notification routes require an authenticated admin
router.get("/", auth, NotificationController.getAll);
router.get("/unread-count", auth, NotificationController.getUnreadCount);
router.patch("/read-all", auth, NotificationController.markAllAsRead);
router.patch("/:id/read", auth, NotificationController.markAsRead);

export default router;
