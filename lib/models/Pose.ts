import mongoose from "mongoose";

const DurationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["breaths", "seconds"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    thumbnailUrl: { type: String, default: "" },
  },
  { _id: false }
);

const PoseSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },

    englishName: { type: String, required: true },
    shortName: { type: String },
    sanskritName: { type: String },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    categories: [{ type: String }],
    bodyFocus: [{ type: String }],
    movementPattern: [{ type: String }],

    energy: {
      type: String,
      enum: ["heating", "cooling", "grounding", "neutral"],
      required: true,
    },

    contraindications: [{ type: String }],

    prepPoses: [{ type: String }],
    counterPoses: [{ type: String }],
    transitionsTo: [{ type: String }],

    duration: {
      type: DurationSchema,
      required: true,
    },

    bilateral: { type: Boolean, default: false },

    image: {
      type: ImageSchema,
      default: () => ({ url: "", thumbnailUrl: "" }),
    },

    breathPattern: {
      type: String,
      enum: ["steady", "deep", "flowing", "expansive"],
      required: true,
    },

    peakPose: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pose ||
  mongoose.model("Pose", PoseSchema);