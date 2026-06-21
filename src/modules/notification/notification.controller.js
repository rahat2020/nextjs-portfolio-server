import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import NotificationService from "./notification.service.js";

/**
 * Notification controller — delegates to NotificationService.
 */
const NotificationController = {
  /** GET /api/notifications */
  getAll: catchAsync(async (req, res) => {
    const { notifications, meta } = await NotificationService.getAll(req.user.id, req.query);

    sendResponse(res, {
      statusCode: 200,
      message: "Notifications retrieved successfully",
      data: notifications,
      meta,
    });
  }),

  /** GET /api/notifications/unread-count */
  getUnreadCount: catchAsync(async (req, res) => {
    const result = await NotificationService.getUnreadCount(req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Unread count retrieved successfully",
      data: result,
    });
  }),

  /** PATCH /api/notifications/:id/read */
  markAsRead: catchAsync(async (req, res) => {
    const notification = await NotificationService.markAsRead(req.params.id, req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Notification marked as read",
      data: notification,
    });
  }),

  /** PATCH /api/notifications/read-all */
  markAllAsRead: catchAsync(async (req, res) => {
    await NotificationService.markAllAsRead(req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "All notifications marked as read",
      data: null,
    });
  }),
};

export default NotificationController;
