import { Router } from "express";
import UploadController from "./upload.controller.js";
import upload from "../../middlewares/upload.js";
import auth from "../../middlewares/auth.js";

const router = Router();

// Protected (admin only)
router.post("/", auth, upload.single("file"), UploadController.uploadImage);

export default router;
