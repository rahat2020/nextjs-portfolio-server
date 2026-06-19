import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import ExperienceService from "./experience.service.js";

/**
 * Experience controller — delegates to ExperienceService.
 */
const ExperienceController = {
  /** POST /api/experiences */
  create: catchAsync(async (req, res) => {
    const experience = await ExperienceService.create(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Experience created successfully",
      data: experience,
    });
  }),

  /** GET /api/experiences */
  getAll: catchAsync(async (req, res) => {
    const { experiences, meta } = await ExperienceService.getAll(req.query);

    sendResponse(res, {
      statusCode: 200,
      message: "Experiences retrieved successfully",
      data: experiences,
      meta,
    });
  }),

  /** GET /api/experiences/:slug */
  getBySlug: catchAsync(async (req, res) => {
    const experience = await ExperienceService.getBySlug(req.params.slug);

    sendResponse(res, {
      statusCode: 200,
      message: "Experience retrieved successfully",
      data: experience,
    });
  }),

  /** PATCH /api/experiences/:id */
  update: catchAsync(async (req, res) => {
    const experience = await ExperienceService.update(req.params.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Experience updated successfully",
      data: experience,
    });
  }),

  /** DELETE /api/experiences/:id */
  delete: catchAsync(async (req, res) => {
    await ExperienceService.delete(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Experience deleted successfully",
      data: null,
    });
  }),
};

export default ExperienceController;
