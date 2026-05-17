import mongoose from "mongoose";

const ClassTemplateSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "arrival",
        "warmup",
        "vinyasa",
        "standing-flow",
        "peak-prep",
        "cooldown",
        "final-relaxation",
      ],
      required: true,
    },

    moduleIds: [{ type: String, required: true }],

    durationTargetMinutes: Number,
  },
  { _id: false }
);

const ClassTemplateSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },

    name: { type: String, required: true },

    style: {
      type: String,
      enum: ["vinyasa", "yin", "ashtanga", "restorative"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    durationMinutes: { type: Number, required: true },

    sections: [ClassTemplateSectionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.ClassTemplate ||
  mongoose.model("ClassTemplate", ClassTemplateSchema);

  