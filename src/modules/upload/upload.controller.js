import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import AppError from "../../utils/AppError.js";
import uploadBufferToCloudinary from "../../utils/cloudinaryUpload.js";

/**
 * Upload controller — pushes images to Cloudinary and returns the resulting URL.
 * Used by the frontend to obtain a `thumbnail` URL before creating/updating
 * a project or post (which store the image URL, not the file itself).
 */
const UploadController = {
  /** POST /api/v1/uploads */
  uploadImage: catchAsync(async (req, res) => {
    if (!req.file) {
      throw new AppError("No file uploaded. Attach a file under the 'file' field.", 400);
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, "portfolio");

    sendResponse(res, {
      statusCode: 201,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  }),
};

export default UploadController;
