import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["post", "project", "experience", "admin"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    /** Admin IDs who have already read this notification (shared feed, per-admin read state) */
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
