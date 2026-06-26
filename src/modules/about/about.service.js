import AboutInfo from "./about.model.js";
import AppError from "../../utils/AppError.js";
import NotificationService from "../notification/notification.service.js";

/**
 * AboutService — Singleton pattern.
 * Only ONE AboutInfo document lives in the database.
 * - create  → creates the document if it doesn't exist yet.
 * - get     → retrieves the single document.
 * - update  → merges new data into the existing document.
 * - delete  → removes the document entirely (hard delete).
 */
const AboutService = {
  /**
   * Create the About Info document.
   * Throws 409 if one already exists (use update instead).
   */
  async create(payload, adminId) {
    const existing = await AboutInfo.findOne();
    if (existing) {
      throw new AppError(
        "About info already exists. Use the update endpoint to modify it.",
        409
      );
    }

    const aboutInfo = await AboutInfo.create(payload);

    await NotificationService.create({
      type: "about",
      message: `About info for "${aboutInfo.full_name}" was created`,
      relatedId: aboutInfo._id,
      createdBy: adminId,
    });

    return aboutInfo;
  },

  /**
   * Retrieve the single About Info document.
   * Throws 404 if none exists yet.
   */
  async get() {
    const aboutInfo = await AboutInfo.findOne();
    if (!aboutInfo) {
      throw new AppError(
        "About info not found. Please create it first.",
        404
      );
    }
    return aboutInfo;
  },

  /**
   * Update the existing About Info document (partial update supported).
   * Throws 404 if none exists yet.
   */
  async update(payload, adminId) {
    const aboutInfo = await AboutInfo.findOne();
    if (!aboutInfo) {
      throw new AppError(
        "About info not found. Please create it first.",
        404
      );
    }

    Object.assign(aboutInfo, payload);
    await aboutInfo.save();

    await NotificationService.create({
      type: "about",
      message: `About info was updated`,
      relatedId: aboutInfo._id,
      createdBy: adminId,
    });

    return aboutInfo;
  },

  /**
   * Hard-delete the About Info document.
   * Throws 404 if none exists.
   */
  async delete(adminId) {
    const aboutInfo = await AboutInfo.findOneAndDelete();
    if (!aboutInfo) {
      throw new AppError("About info not found.", 404);
    }

    await NotificationService.create({
      type: "about",
      message: `About info was deleted`,
      relatedId: aboutInfo._id,
      createdBy: adminId,
    });

    return aboutInfo;
  },
};

export default AboutService;
