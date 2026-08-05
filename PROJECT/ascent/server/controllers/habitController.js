const Habit = require("../models/Habit");
const User = require("../models/User"); // FIX: Imported User model
const { processExpGain, calculateNextLevelXp, calculateLevelBaseXp} = require("../utils/progression");
const { calculateCurrentStreak } = require('../utils/streakCalculator');
// @route   POST /api/habits
const createHabit = async (req, res) => {
    try {
        // FIX: Extract 'title' instead of 'name' to match your schema and UI
        const { title, description, xp, difficulty } = req.body; 
        
        if (!title) return res.status(400).json({ message: "Habit title is required" });

        const habit = await Habit.create({
            user: req.user.id,
            title, // FIX: Now correctly references the destructured variable
            xp: xp || 20,
            difficulty: difficulty || 'Easy',
            completedDates: [] 
        });

        res.status(201).json({ success: true, data: habit });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Add this below your createHabit function
const updateHabit = async (req, res) => {
    try {
        const { title, description, xp, difficulty } = req.body;
        const habitId = req.params.id;

        // Find the habit and ensure it belongs to the logged-in user
        let habit = await Habit.findOne({ _id: habitId, user: req.user.id });

        if (!habit) {
            return res.status(404).json({ success: false, message: "Habit not found or unauthorized." });
        }

        // Update the fields
        habit.title = title || habit.title;
        habit.xp = xp || habit.xp;
        habit.description = description !== undefined ? description : habit.description;
        habit.difficulty = difficulty || habit.difficulty;

        await habit.save();

        res.status(200).json({ success: true, habit });
    } catch (error) {
        console.error("Failed to update habit:", error);
        res.status(500).json({ success: false, message: "Server error updating habit" });
    }
};

// @desc    Get all habit blueprints (For the dedicated Habits page)
// @route   GET /api/habits
// @desc    Get all habits for the logged-in user
// @route   GET /api/habits
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });

        // Intercept the data and inject the dynamic streak
        const habitsWithStreaks = habits.map(habit => {
            const habitObj = habit.toObject(); // Convert Mongoose document to plain JS object
            habitObj.currentStreak = calculateCurrentStreak(habitObj.completedDates || []);
            return habitObj;
        });

        res.status(200).json({ 
            success: true, 
            count: habitsWithStreaks.length, 
            data: habitsWithStreaks 
        });
    } catch (error) {
        console.error("Get Habits Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Toggle a habit's completion for a specific date
// @route   PUT /api/habits/:id/toggle
// FIX: Defined as a const to match the rest of the file's structure
const toggleHabit = async (req, res) => {
    try {
        const { date } = req.body; 
        const habitId = req.params.id;
        const userId = req.user.id; 

        const habit = await Habit.findById(habitId);
        let user = await User.findById(userId);

        if (!habit || !user) {
            return res.status(404).json({ message: "Habit or User not found" });
        }

        const isCurrentlyCompleted = habit.completedDates.includes(date);

        if (isCurrentlyCompleted) {
            // Un-complete: Remove date and subtract XP
            habit.completedDates = habit.completedDates.filter(d => d !== date);
            user.xp -= habit.xp;
            if (user.xp < 0) user.xp = 0;

            let currentBase = calculateLevelBaseXp(user.level);
            while (user.xp < currentBase && user.level > 1) {
                user.level -= 1;
                currentBase = calculateLevelBaseXp(user.level);
            }

        } else {
            // Complete: Add date and add XP
            habit.completedDates.push(date);
            user.xp += habit.xp;
            processExpGain(user);
        }

        // 3. Handle potential Level Ups (if you have level logic, trigger it here)
        // Example: if (user.xp >= user.nextLevelXp) { user.level += 1; }

        await habit.save();
        await user.save();

        const habitObj = habit.toObject();
        habitObj.currentStreak = calculateCurrentStreak(habitObj.completedDates || []);

        res.status(200).json({
            success: true,
            habit: habitObj,
            user,
            currentLevelBaseXp: calculateLevelBaseXp(user.level),
            nextLevelXp: calculateNextLevelXp(user.level)
        });

    } catch (error) {
        console.error("Error toggling habit:", error);
        res.status(500).json({ message: "Server error toggling habit" });
    }
};

// @desc    Delete a habit completely
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        // Assuming you deduct XP here, YOU MUST RUN THE LEVEL DOWN LOOP
        let user = await User.findById(req.user.id);
        // ... (deduct xp logic)
        
        if (user.xp < 0) user.xp = 0;
        let currentBase = calculateLevelBaseXp(user.level);
        while (user.xp < currentBase && user.level > 1) {
            user.level -= 1;
            currentBase = calculateLevelBaseXp(user.level);
        }
        await user.save();

        // YOU MUST RETURN THE UPDATED USER
        res.status(200).json({ 
            success: true, 
            message: "Habit deleted", 
            user,
            currentLevelBaseXp: calculateLevelBaseXp(user.level),
            nextLevelXp: calculateNextLevelXp(user.level)
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const exportHabitsCSV = async (req, res) => {
    try {
        // Retrieve all protocols assigned to the requesting user
        const habits = await Habit.find({ user: req.user.id });

        if (!habits || habits.length === 0) {
            return res.status(404).json({ message: "No operational data found for extraction." });
        }

        // Define the CSV Headers
        const csvHeader = "Protocol Name,Category,Difficulty,Current Streak,Total XP Yield,Creation Date\n";

        // Map the database documents to CSV rows
        const csvRows = habits.map(habit => {
            // Sanitize strings to prevent CSV injection or formatting breaks
            const name = `"${(habit.title || habit.name || "").replace(/"/g, '""')}"`;
            const category = `"${(habit.category || "General").replace(/"/g, '""')}"`;
            const difficulty = `"${habit.difficulty || "Medium"}"`;
            const streak = habit.streak || 0;
            const xpYield = habit.xpReward || 0; // Adjust if your schema uses a different field name
            const createdAt = habit.createdAt ? new Date(habit.createdAt).toISOString().split('T')[0] : "Unknown";

            return `${name},${category},${difficulty},${streak},${xpYield},${createdAt}`;
        });

        // Construct the final file blob
        const csvData = csvHeader + csvRows.join("\n");

        // Set headers to force a file download on the client side
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="ascent_telemetry.csv"');
        
        return res.status(200).send(csvData);

    } catch (error) {
        console.error("Telemetry Export Error:", error);
        res.status(500).json({ message: "Server failure during data extraction." });
    }
};
// FIX: Now all functions exist in the local scope and will export properly
module.exports = { createHabit, updateHabit, getHabits, toggleHabit, deleteHabit, exportHabitsCSV };
