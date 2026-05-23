import mongoose from "mongoose";

const SavedClassSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "arrival",
        "warmup",
        "sun-salutations",
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

const SavedClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sourceTemplateId: { type: String },

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

    sections: [SavedClassSectionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.SavedClass ||
  mongoose.model("SavedClass", SavedClassSchema);
  