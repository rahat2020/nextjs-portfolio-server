import Notification from "./notification.model.js";
import AppError from "../../utils/AppError.js";
import QueryBuilder from "../../utils/queryBuilder.js";
import { emitNotification } from "../../socket/index.js";

const toAdminView = (notification, adminId) => {
  const { readBy, ...rest } = notification.toObject();
  return { ...rest, isRead: readBy.some((id) => id.equals(adminId)) };
};

/**
 * Notification service — creates and broadcasts notifications for admin actions
 * (post/project/experience/admin creation), and serves them as a shared, per-admin-read feed.
 */
const NotificationService = {
  /** Create a notification and broadcast it to all connected admins in real time */
  async create({ type, message, relatedId, createdBy }) {
    const notification = await Notification.create({ type, message, relatedId, createdBy });
    console.log(`[DEBUG] created notification id=${notification._id} type=${type} createdBy=${createdBy}`);
    emitNotification(notification);
    return notification;
  },

  /** Get paginated notifications, annotated with the requesting admin's read state */
  async getAll(adminId, queryParams) {
    const builder = new QueryBuilder(Notification.find(), queryParams)
      .filter(["type"])
      .sort();

    await builder.paginate();

    const notifications = await builder.query;
    console.log(`[DEBUG] getAll adminId=${adminId} queryParams=${JSON.stringify(queryParams)} found=${notifications.length} total=${builder.meta.total}`);
    return {
      notifications: notifications.map((n) => toAdminView(n, adminId)),
      meta: builder.meta,
    };
  },

  /** Count notifications the admin hasn't read yet */
  async getUnreadCount(adminId) {
    const count = await Notification.countDocuments({ readBy: { $ne: adminId } });
    console.log(`[DEBUG] getUnreadCount adminId=${adminId} count=${count}`);
    return { count };
  },

  /** Mark a single notification as read for this admin */
  async markAsRead(id, adminId) {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { $addToSet: { readBy: adminId } },
      { new: true }
    );
    if (!notification) throw new AppError("Notification not found", 404);
    return toAdminView(notification, adminId);
  },

  /** Mark every notification as read for this admin */
  async markAllAsRead(adminId) {
    await Notification.updateMany(
      { readBy: { $ne: adminId } },
      { $addToSet: { readBy: adminId } }
    );
  },
};

export default NotificationService;
