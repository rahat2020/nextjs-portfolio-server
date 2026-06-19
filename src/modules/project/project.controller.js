import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import ProjectService from "./project.service.js";

/**
 * Project controller — delegates to ProjectService.
 */
const ProjectController = {
  /** POST /api/projects */
  create: catchAsync(async (req, res) => {
    const project = await ProjectService.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Project created successfully",
      data: project,
    });
  }),

  /** GET /api/projects */
  getAll: catchAsync(async (req, res) => {
    const { projects, meta } = await ProjectService.getAll(req.query);

    sendResponse(res, {
      statusCode: 200,
      message: "Projects retrieved successfully",
      data: projects,
      meta,
    });
  }),

  /** GET /api/projects/:slug */
  getBySlug: catchAsync(async (req, res) => {
    const project = await ProjectService.getBySlug(req.params.slug);

    sendResponse(res, {
      statusCode: 200,
      message: "Project retrieved successfully",
      data: project,
    });
  }),

  /** PATCH /api/projects/:id */
  update: catchAsync(async (req, res) => {
    const project = await ProjectService.update(req.params.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Project updated successfully",
      data: project,
    });
  }),

  /** DELETE /api/projects/:id */
  delete: catchAsync(async (req, res) => {
    await ProjectService.delete(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Project deleted successfully",
      data: null,
    });
  }),
};

export default ProjectController;
