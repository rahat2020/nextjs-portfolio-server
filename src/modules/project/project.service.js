import mongoose from "mongoose";
import Project from "./project.model.js";
import AppError from "../../utils/AppError.js";
import QueryBuilder from "../../utils/queryBuilder.js";
import NotificationService from "../notification/notification.service.js";

/**
 * Project service — all business logic for portfolio projects.
 */
const ProjectService = {
  /** Create a new project */
  async create(payload, adminId) {
    const project = await Project.create(payload);

    await NotificationService.create({
      type: "project",
      message: `New project "${project.title}" was created`,
      relatedId: project._id,
      createdBy: adminId,
    });

    return project;
  },

  /** Get all projects with pagination, search, and filtering */
  async getAll(queryParams) {
    const builder = new QueryBuilder(Project.find(), queryParams)
      .search(["title"])
      .filter(["category", "isPublished", "isFeatured"])
      .sort()
      .fields();

    await builder.paginate();

    const projects = await builder.query;
    return { projects, meta: builder.meta };
  },

  /** Get a single project by slug, or by ID as a fallback */
  async getBySlug(slug) {
    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug };

    const project = await Project.findOne(query);
    if (!project) throw new AppError("Project not found", 404);
    return project;
  },

  /** Update a project by ID */
  async update(id, payload) {
    const project = await Project.findById(id);
    if (!project) throw new AppError("Project not found", 404);

    Object.assign(project, payload);
    await project.save(); // Triggers pre-save hooks (slug regeneration)
    return project;
  },

  /** Soft delete a project by ID */
  async delete(id) {
    const project = await Project.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).select("+isDeleted");

    if (!project) throw new AppError("Project not found", 404);
    return project;
  },
};

export default ProjectService;
