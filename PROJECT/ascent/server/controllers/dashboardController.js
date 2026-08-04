const Mission = require("../models/Mission");
const Habit = require("../models/Habit");

// GET /api/dashboard/daily?date=YYYY-MM-DD
const getDailyActions = async (req, res) => {
    try {
        const targetDate = req.query.date; 

        if (!targetDate) {
            return res.status(400).json({ success: false, message: "A date query parameter (YYYY-MM-DD) is required." });
        }

        // 1. Fetch one-off missions tied strictly to this date
        const missions = await Mission.find({ user: req.user.id, date: targetDate });

        // 2. Fetch all habits belonging to the user
        const habits = await Habit.find({ user: req.user.id });

        // 3. Format Missions (Tag them as 'mission')
        const formattedMissions = missions.map(m => ({
            _id: m._id,
            title:m.title,
            description: m.description,
            xp: m.xp,
            Completed: m.completed || false,
            type: "mission", // Crucial for the frontend to know how to toggle this later
            difficulty: m.difficulty
        }));

       // 4. Format Habits (Calculate completion status on the fly, tag as 'habit')
        const formattedHabits = habits
            .filter(h => h.createdAt.toISOString().split('T')[0] <= targetDate)
            .map(h => ({
                _id: h._id,
                title: h.title, // Maps the Habit's 'name' to 'title' so it matches Missions
                description: h.description,
                xp: h.xp,
                Completed: (h.completedDates || []).includes(targetDate), // Bulletproofed
                type: "habit",
                difficulty: h.difficulty
            }));

        // 5. Merge and return the unified payload
        const dailyActions = [...formattedHabits, ...formattedMissions];

        res.status(200).json({ success: true, count: dailyActions.length, data: dailyActions });

    } catch (error) {
        console.error("Error fetching daily actions:", error);
        res.status(500).json({ success: false, message: "Server initialization failed during data merge." });
    }
};

module.exports = { getDailyActions };