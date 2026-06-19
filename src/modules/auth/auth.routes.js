import { Router } from "express";
import AuthController from "./auth.controller.js";
import validate from "../../middlewares/validate.js";
import auth from "../../middlewares/auth.js";
import { loginSchema, createAdminSchema, updateAdminSchema } from "./auth.validation.js";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/register", validate(createAdminSchema), AuthController.register);
router.get("/profile", auth, AuthController.getProfile);

// Admin CRUD routes
router.get("/admins", auth, AuthController.getAllAdmins);
router.get("/admins/:id", auth, AuthController.getAdminById);
router.post("/admins", auth, validate(createAdminSchema), AuthController.createAdmin);
router.patch("/admins/:id", auth, validate(updateAdminSchema), AuthController.updateAdmin);
router.delete("/admins/:id", auth, AuthController.deleteAdmin);

export default router;
