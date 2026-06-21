import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import AuthService from "./auth.service.js";

/**
 * Auth controller — thin layer that delegates to AuthService.
 */
const AuthController = {
  /** POST /api/auth/login */
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: result,
    });
  }),

  /** POST /api/auth/register */
  register: catchAsync(async (req, res) => {
    const result = await AuthService.register(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Admin registered successfully",
      data: result,
    });
  }),

  /** GET /api/auth/profile (protected) */
  getProfile: catchAsync(async (req, res) => {
    const admin = await AuthService.getProfile(req.user.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Admin profile retrieved",
      data: admin,
    });
  }),

  /** GET /api/auth/admins (protected) */
  getAllAdmins: catchAsync(async (req, res) => {
    const admins = await AuthService.getAllAdmins();

    sendResponse(res, {
      statusCode: 200,
      message: "Admins retrieved successfully",
      data: admins,
    });
  }),

  /** GET /api/auth/admins/:id (protected) */
  getAdminById: catchAsync(async (req, res) => {
    const admin = await AuthService.getAdminById(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Admin retrieved successfully",
      data: admin,
    });
  }),

  /** POST /api/auth/admins (protected) */
  createAdmin: catchAsync(async (req, res) => {
    const admin = await AuthService.createAdmin(req.body, req.user.id);

    sendResponse(res, {
      statusCode: 201,
      message: "Admin created successfully",
      data: admin,
    });
  }),

  /** PATCH /api/auth/admins/:id (protected) */
  updateAdmin: catchAsync(async (req, res) => {
    const admin = await AuthService.updateAdmin(req.params.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Admin updated successfully",
      data: admin,
    });
  }),

  /** DELETE /api/auth/admins/:id (protected) */
  deleteAdmin: catchAsync(async (req, res) => {
    await AuthService.deleteAdmin(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Admin deleted successfully",
      data: null,
    });
  }),
};

export default AuthController;
