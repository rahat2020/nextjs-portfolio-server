import Post from "./post.model.js";
import AppError from "../../utils/AppError.js";
import QueryBuilder from "../../utils/queryBuilder.js";

/**
 * Post service — all business logic for blog posts.
 */
const PostService = {
  /** Create a new post */
  async create(payload) {
    const post = await Post.create(payload);
    return post;
  },

  /** Get all posts with pagination, search, and filtering */
  async getAll(queryParams) {
    const builder = new QueryBuilder(Post.find(), queryParams)
      .search(["title"])
      .filter(["category", "isPublished"])
      .sort()
      .fields();

    await builder.paginate();

    const posts = await builder.query;
    return { posts, meta: builder.meta };
  },

  /** Get a single post by slug */
  async getBySlug(slug) {
    const post = await Post.findOne({ slug });
    if (!post) throw new AppError("Post not found", 404);
    return post;
  },

  /** Update a post by ID */
  async update(id, payload) {
    const post = await Post.findById(id);
    if (!post) throw new AppError("Post not found", 404);

    Object.assign(post, payload);
    await post.save(); // Triggers pre-save hooks (slug regeneration)
    return post;
  },

  /** Soft delete a post by ID */
  async delete(id) {
    const post = await Post.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).select("+isDeleted");

    if (!post) throw new AppError("Post not found", 404);
    return post;
  },
};

export default PostService;
