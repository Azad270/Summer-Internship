const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Ties the mission to the specific Ascender
    },
    title: {
      type: String,
      required: [true, "Mission title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    xp: {
      type: Number,
      required: [true, "XP reward is required"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Elite"],
      default: "Easy",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);