import mongoose from "mongoose";
import slugify from "slugify";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "web",
      trim: true,
      lowercase: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
projectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug =
      slugify(this.title, { lower: true, strict: true }) +
      "-" +
      Date.now().toString(36);
  }
  next();
});

/** Exclude soft-deleted documents from all find queries */
projectSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

/** Text index for search */
projectSchema.index({ title: "text", technologies: "text" });

const Project = mongoose.model("Project", projectSchema);
export default Project;
