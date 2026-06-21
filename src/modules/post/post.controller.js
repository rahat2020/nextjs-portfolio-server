import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/apiResponse.js";
import PostService from "./post.service.js";

/**
 * Post controller — delegates to PostService.
 */
const PostController = {
  /** POST /api/posts */
  create: catchAsync(async (req, res) => {
    const post = await PostService.create(req.body, req.user.id);

    sendResponse(res, {
      statusCode: 201,
      message: "Post created successfully",
      data: post,
    });
  }),

  /** GET /api/posts */
  getAll: catchAsync(async (req, res) => {
    const { posts, meta } = await PostService.getAll(req.query);

    sendResponse(res, {
      statusCode: 200,
      message: "Posts retrieved successfully",
      data: posts,
      meta,
    });
  }),

  /** GET /api/posts/:slug */
  getBySlug: catchAsync(async (req, res) => {
    const post = await PostService.getBySlug(req.params.slug);

    sendResponse(res, {
      statusCode: 200,
      message: "Post retrieved successfully",
      data: post,
    });
  }),

  /** PATCH /api/posts/:id */
  update: catchAsync(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Post updated successfully",
      data: post,
    });
  }),

  /** DELETE /api/posts/:id */
  delete: catchAsync(async (req, res) => {
    await PostService.delete(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      message: "Post deleted successfully",
      data: null,
    });
  }),
};

export default PostController;
