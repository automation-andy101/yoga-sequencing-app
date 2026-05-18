import mongoose from "mongoose";

const ModulePoseSchema = new mongoose.Schema(
  {
    poseId: { type: String, required: true },

    duration: {
      type: {
        type: String,
        enum: ["breaths", "seconds"],
        required: true,
      },
      value: { type: Number, required: true },
    },

    side: {
      type: String,
      enum: ["left", "right", "both"],
    },

    notes: String,
  },
  { _id: false }
);

const ModuleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },

    name: { type: String, required: true },

    type: {
      type: String,
      enum: [
        "warmup",
        "mobility",
        "flow",
        "strength",
        "cooldown",
        "restorative",
        "sun-salutation",
      ],
      required: true,
    },

    style: [
      {
        type: String,
        enum: ["vinyasa", "yin", "ashtanga", "restorative"],
      },
    ],

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    focus: [{ type: String }],

    energy: {
      type: String,
      enum: ["warming", "heating", "cooling", "grounding", "neutral"],
      required: true,
    },

    estimatedBreaths: Number,

    poses: [ModulePoseSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Module ||
  mongoose.model("Module", ModuleSchema);