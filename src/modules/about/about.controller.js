import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import AboutService from "./about.service.js";

/**
 * AboutController — delegates all logic to AboutService.
 */
const AboutController = {
  /** POST /api/v1/about — Create the about info (admin only) */
  create: catchAsync(async (req, res) => {
    const aboutInfo = await AboutService.create(req.body, req.user.id);

    sendResponse(res, {
      statusCode: 201,
      message: "About info created successfully",
      data: aboutInfo,
    });
  }),

  /** GET /api/v1/about — Public: retrieve the about info */
  get: catchAsync(async (req, res) => {
    const aboutInfo = await AboutService.get();

    sendResponse(res, {
      statusCode: 200,
      message: "About info retrieved successfully",
      data: aboutInfo,
    });
  }),

  /** PATCH /api/v1/about — Update about info (admin only) */
  update: catchAsync(async (req, res) => {
    const aboutInfo = await AboutService.update(req.body, req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "About info updated successfully",
      data: aboutInfo,
    });
  }),

  /** PUT /api/v1/about — Full replace of about info (admin only) */
  replace: catchAsync(async (req, res) => {
    const aboutInfo = await AboutService.update(req.body, req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "About info replaced successfully",
      data: aboutInfo,
    });
  }),

  /** DELETE /api/v1/about — Delete about info (admin only) */
  delete: catchAsync(async (req, res) => {
    await AboutService.delete(req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "About info deleted successfully",
      data: null,
    });
  }),
};

export default AboutController;
