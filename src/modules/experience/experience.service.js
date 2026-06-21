import mongoose from "mongoose";
import Experience from "./experience.model.js";
import AppError from "../../utils/AppError.js";
import QueryBuilder from "../../utils/queryBuilder.js";
import NotificationService from "../notification/notification.service.js";

/**
 * Experience service — all business logic for work experiences.
 */
const ExperienceService = {
  /** Create a new experience */
  async create(payload, adminId) {
    const experience = await Experience.create(payload);

    await NotificationService.create({
      type: "experience",
      message: `New experience at "${experience.company}" was created`,
      relatedId: experience._id,
      createdBy: adminId,
    });

    return experience;
  },

  /** Get all experiences with pagination, search, and filtering */
  async getAll(queryParams) {
    const builder = new QueryBuilder(Experience.find(), queryParams)
      .search(["company", "position"])
      .filter(["isPublished", "isCurrentlyWorking"])
      .sort()
      .fields();

    await builder.paginate();

    const experiences = await builder.query;
    return { experiences, meta: builder.meta };
  },

  /** Get a single experience by slug, or by ID as a fallback */
  async getBySlug(slug) {
    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug };

    const experience = await Experience.findOne(query);
    if (!experience) throw new AppError("Experience not found", 404);
    return experience;
  },

  /** Update an experience by ID */
  async update(id, payload) {
    const experience = await Experience.findById(id);
    if (!experience) throw new AppError("Experience not found", 404);

    Object.assign(experience, payload);
    await experience.save(); // Triggers pre-save hooks (slug regeneration)
    return experience;
  },

  /** Soft delete an experience by ID */
  async delete(id) {
    const experience = await Experience.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).select("+isDeleted");

    if (!experience) throw new AppError("Experience not found", 404);
    return experience;
  },
};

export default ExperienceService;
