const Mission = require("../models/Mission");
const User = require("../models/User");
const { processExpGain, calculateNextLevelXp, calculateLevelBaseXp} = require("../utils/progression");

const XP_PER_LEVEL = 500;

// @desc    Get all missions for logged-in user
// @route   GET /api/missions
const getMissions = async (req, res) => {
    try {
        // Extract the date from the query parameter (e.g., ?date=2026-08-01)
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ success: false, message: "Date is required" });
        }

        const missions = await Mission.find({ 
            user: req.user.id,
            date: date 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, missions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create a new mission
// @route   POST /api/missions
const createMission = async (req, res) => {
    try {
        const { title, description, xp, difficulty, date } = req.body;

        if (!title || !xp || !date) {
            return res.status(400).json({ success: false, message: "Please provide title, XP and date" });
        }

        const mission = await Mission.create({
            title,
            description,
            xp,
            difficulty,
            date,
            user: req.user.id,
        });

        res.status(201).json({ success: true, mission });
    } catch (error) {
        console.error("Create Mission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Toggle mission completion status
// @route   PUT /api/missions/:id
const toggleMission = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!mission) {
            return res.status(404).json({ success: false, message: "Mission not found" });
        }
        if (mission.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        const isCompleting = !mission.completed;
        mission.completed = isCompleting;

        // Apply XP
        if (isCompleting) {
            user.xp += mission.xp;
            processExpGain(user); // Handles leveling up
        } else {
            user.xp -= mission.xp;
            
            // Failsafe for dropping below 0
            if (user.xp < 0) user.xp = 0; 

            // THE FIX: Unconditional Level Down Check
            let currentBase = calculateLevelBaseXp(user.level);
            while (user.xp < currentBase && user.level > 1) {
                user.level -= 1;
                currentBase = calculateLevelBaseXp(user.level);
            }
        }
        
        await mission.save();
        await user.save(); // Saves XP, Level, and triggers any Rank recalculations

        res.status(200).json({ 
            success: true, 
            mission,
            // THE FIX: Send the COMPLETE user document so Rank isn't lost
            user, 
            currentLevelBaseXp: calculateLevelBaseXp(user.level),
            nextLevelXp: calculateNextLevelXp(user.level)
        });
    } catch (error) {
        console.error("Toggle Mission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Delete a mission
// @route   DELETE /api/missions/:id
const deleteMission = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({ success: false, message: "Mission not found" });
        }

        if (mission.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        let userUpdated = false;
        let user = null;
        
        // If they delete an already-completed mission, we must revoke the XP and check for level drop
        if (mission.completed) {
            user = await User.findById(req.user.id);
            if (user) {
                user.xp -= mission.xp;
                if (user.xp < 0) user.xp = 0;
                
                // THE FIX: Unconditional Level Down Check
                let currentBase = calculateLevelBaseXp(user.level);
                while (user.xp < currentBase && user.level > 1) {
                    user.level -= 1;
                    currentBase = calculateLevelBaseXp(user.level);
                }

                await user.save();
                userUpdated = true;
            }
        }

        await mission.deleteOne();

        if (userUpdated) {
            return res.status(200).json({ 
                success: true, 
                id: req.params.id,
                // THE FIX: Send the COMPLETE user document
                user, 
                currentLevelBaseXp: calculateLevelBaseXp(user.level),
                nextLevelXp: calculateNextLevelXp(user.level)
            });
        }

        res.status(200).json({ success: true, id: req.params.id });
    } catch (error) {
        console.error("Delete Mission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateMission = async (req, res) => {
    try {
        const { title, description, xp, difficulty } = req.body;
        let mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({ success: false, message: "Mission not found" });
        }
        if (mission.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        // FIX 2: Block XP exploits on completed missions
        if (mission.completed && xp !== undefined && Number(xp) !== mission.xp) {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot change the XP value of a completed mission. Uncheck it first." 
            });
        }

        mission.title = title || mission.title;
        mission.description = description !== undefined ? description : mission.description;
        mission.xp = xp || mission.xp;
        mission.difficulty = difficulty || mission.difficulty;

        await mission.save();

        res.status(200).json({ success: true, mission });
    } catch (error) {
        console.error("Update Mission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get XP history for the last 7 days
// @route   GET /api/missions/history
const getMissionHistory = async (req, res) => {
    try {
        // 1. Generate an array of the last 7 days formatted as "YYYY-MM-DD"
        const today = new Date();
        const past7Days = Array.from({length: 7}, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString('en-CA');
        }).reverse(); // Reverse so it goes oldest to newest (left to right on a graph)

        // 2. Fetch all completed missions for this user within those dates
        const missions = await Mission.find({
            user: req.user.id,
            date: { $in: past7Days },
            completed: true
        });

        // 3. Aggregate the data into the exact format Recharts requires
        const chartData = past7Days.map(dateStr => {
            // Find all missions completed on this specific day
            const dayMissions = missions.filter(m => m.date === dateStr);
            // Sum up their XP
            const totalXP = dayMissions.reduce((sum, m) => sum + m.xp, 0);
            
            // Format the date for a cleaner UI (e.g., "Aug 01")
            const shortDate = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            return { 
                name: shortDate, // X-axis label
                xp: totalXP      // Y-axis value
            };
        });

        res.status(200).json({ success: true, data: chartData });
    } catch (error) {
        console.error("History Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    getMissions,
    createMission,
    toggleMission,
    deleteMission,
    updateMission,
    getMissionHistory,
};