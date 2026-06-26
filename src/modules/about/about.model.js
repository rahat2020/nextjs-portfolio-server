import mongoose from "mongoose";

/**
 * AboutInfo Schema — stores all personal/portfolio profile information.
 * Only one document is expected (singleton pattern).
 */
const aboutSchema = new mongoose.Schema(
  {
    // ── Personal Identity ──────────────────────────────────────────
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    short_name: {
      type: String,
      trim: true,
      maxlength: [50, "Short name cannot exceed 50 characters"],
      default: "",
    },
    job_title: {
      type: String,
      trim: true,
      maxlength: [150, "Job title cannot exceed 150 characters"],
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    resume_url: {
      type: String,
      default: "",
    },

    // ── Contact Info ───────────────────────────────────────────────
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },

    // ── Hero / Header Section ──────────────────────────────────────
    header_title: {
      type: String,
      trim: true,
      maxlength: [200, "Header title cannot exceed 200 characters"],
      default: "",
    },
    header_description: {
      type: String,
      default: "",
    },

    // ── About Section ──────────────────────────────────────────────
    about_title: {
      type: String,
      trim: true,
      maxlength: [200, "About title cannot exceed 200 characters"],
      default: "",
    },
    about_description: {
      type: String,
      default: "",
    },

    // ── Social / Contact Links ─────────────────────────────────────
    linkedin_title: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin_link: {
      type: String,
      default: "",
    },
    facebook_link: {
      type: String,
      default: "",
    },
    twitter_link: {
      type: String,
      default: "",
    },
    instagram_link: {
      type: String,
      default: "",
    },
    whatsapp_link: {
      type: String,
      default: "",
    },
    github_link: {
      type: String,
      default: "",
    },
    youtube_link: {
      type: String,
      default: "",
    },
    website_link: {
      type: String,
      default: "",
    },

    // ── Extra / Meta ───────────────────────────────────────────────
    years_of_experience: {
      type: Number,
      default: 0,
    },
    projects_completed: {
      type: Number,
      default: 0,
    },
    open_to_work: {
      type: Boolean,
      default: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    meta_title: {
      type: String,
      trim: true,
      default: "",
    },
    meta_description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const AboutInfo = mongoose.model("AboutInfo", aboutSchema);
export default AboutInfo;
