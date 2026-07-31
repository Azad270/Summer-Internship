const Mission = require("../models/Mission");
const User = require("../models/User");

// @desc    Get all missions for logged-in user
// @route   GET /api/missions
const getMissions = async (req, res) => {
    try {
        const missions = await Mission.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, missions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create a new mission
// @route   POST /api/missions
const createMission = async (req, res) => {
    try {
        const { title, description, xp, difficulty } = req.body;

        if (!title || !xp) {
            return res.status(400).json({ success: false, message: "Please provide title and XP" });
        }

        const mission = await Mission.create({
            title,
            description,
            xp,
            difficulty,
            user: req.user.id,
        });

        res.status(201).json({ success: true, mission });
    } catch (error) {
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

        if (isCompleting) {
            user.xp += mission.xp;
        } else {
            user.xp -= mission.xp;
        }

        if (user.xp >= 500) {
            user.level += 1;
            user.xp -= 500; 
        } else if (user.xp < 0 && user.level > 1) {
            user.level -= 1;
            user.xp += 500;
        }

        if (user.xp < 0) user.xp = 0;

        await mission.save();
        await user.save();

        res.status(200).json({ 
            success: true, 
            mission,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                level: user.level,
                xp: user.xp
            }
        });
    } catch (error) {
        console.error("Toggle Mission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Edit/Update a mission's details
// @route   PUT /api/missions/:id/edit
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

        await mission.deleteOne();

        res.status(200).json({ success: true, id: req.params.id });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    getMissions,
    createMission,
    toggleMission,
    deleteMission,
    updateMission
};