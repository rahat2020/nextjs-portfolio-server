import mongoose from "mongoose";
import slugify from "slugify";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    technologies: {
      type: [String],
      default: [],
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
 * Pre-save hook: auto-generate slug from company + position.
 * Appends a short random suffix to guarantee uniqueness.
 */
experienceSchema.pre("save", function (next) {
  if (this.isModified("company") || this.isModified("position")) {
    this.slug =
      slugify(`${this.company} ${this.position}`, { lower: true, strict: true }) +
      "-" +
      Date.now().toString(36);
  }
  next();
});

/** Exclude soft-deleted documents from all find queries */
experienceSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

/** Text index for search */
experienceSchema.index({ company: "text", position: "text" });

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
