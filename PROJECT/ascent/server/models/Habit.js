const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        xp: {
            type: Number,
            default: 20,
        },
        completedDates: {
            type: [String], // Array of 'YYYY-MM-DD' strings
            default: [],
        },
        // Add this to your Habit schema definition
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard', 'Elite'],
            default: 'Easy'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);