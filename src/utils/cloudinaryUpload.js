import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

/**
 * Streams an in-memory file buffer (from multer) to Cloudinary.
 * Avoids writing the file to disk first.
 */
const uploadBufferToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });

export default uploadBufferToCloudinary;
