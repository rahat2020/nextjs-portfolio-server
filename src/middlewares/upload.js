import multer from "multer";
import AppError from "../utils/AppError.js";

/**
 * Multer configuration for in-memory file uploads.
 * Files are stored in memory as Buffer objects — suitable for
 * streaming directly to Cloudinary without touching the disk.
 */

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Only image files (jpeg, png, webp, gif, svg) are allowed",
        400,
      ),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
  },
});

export default upload;
