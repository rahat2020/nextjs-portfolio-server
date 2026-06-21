import jwt from "jsonwebtoken";
import Admin from "./auth.model.js";
import AppError from "../../utils/AppError.js";
import config from "../../config/index.js";
import NotificationService from "../notification/notification.service.js";

/**
 * Auth service — handles business logic for authentication.
 */
const AuthService = {
  /**
   * Authenticate admin and return a JWT.
   */
  async login(email, password) {
    // 1. Find admin (explicitly select password)
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      throw new AppError("Invalid email or password", 401);
    }

    // 2. Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    };
  },

  /**
   * Get current admin profile (from token payload).
   */
  async getProfile(adminId) {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new AppError("Admin not found", 404);
    return admin;
  },

  /**
   * Get all admins.
   */
  async getAllAdmins() {
    return Admin.find();
  },

  /**
   * Get admin by ID.
   */
  async getAdminById(adminId) {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new AppError("Admin not found", 404);
    return admin;
  },

  /**
   * Create a new admin.
   */
  async createAdmin(adminData, createdBy) {
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      throw new AppError("Admin with this email already exists", 400);
    }
    const admin = await Admin.create(adminData);

    if (createdBy) {
      await NotificationService.create({
        type: "admin",
        message: `New admin "${admin.name}" was created`,
        relatedId: admin._id,
        createdBy,
      });
    }

    return admin;
  },

  /**
   * Register a new admin and return a JWT.
   */
  async register(adminData) {
    const admin = await this.createAdmin(adminData);

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    };
  },

  /**
   * Update an existing admin.
   */
  async updateAdmin(adminId, updateData) {
    const admin = await Admin.findById(adminId);
    if (!admin) throw new AppError("Admin not found", 404);

    // Update fields dynamically
    Object.keys(updateData).forEach((key) => {
      admin[key] = updateData[key];
    });

    await admin.save();
    return admin;
  },

  /**
   * Delete an admin.
   */
  async deleteAdmin(adminId) {
    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) throw new AppError("Admin not found", 404);
    return admin;
  },
};

export default AuthService;
