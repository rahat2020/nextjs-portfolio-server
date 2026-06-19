import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "uncategorized",
      trim: true,
      lowercase: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false, // Soft delete flag — hidden from queries by default
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook: auto-generate slug from title.
 * Appends a short random suffix to guarantee uniqueness.
 */
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug =
      slugify(this.title, { lower: true, strict: true }) +
      "-" +
      Date.now().toString(36);
  }
  next();
});

/** Exclude soft-deleted documents from all find queries */
postSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

/** Text index for search */
postSchema.index({ title: "text", tags: "text" });

const Post = mongoose.model("Post", postSchema);
export default Post;
