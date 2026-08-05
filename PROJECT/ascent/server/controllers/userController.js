const User = require("../models/User");
// 1. Import your single source of truth for progression math
const { calculateLevelBaseXp, calculateNextLevelXp } = require("../utils/progression");

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
            // 2. The Fix: Send the exact boundaries the React UI expects on refresh
            currentLevelBaseXp: calculateLevelBaseXp(user.level),
            nextLevelXp: calculateNextLevelXp(user.level)
        });

    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { avatar } = req.body;
        
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update the avatar if provided
        if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        // Return the exact same payload structure as getCurrentUser to keep React Context synced
        res.status(200).json({
            success: true,
            user,
            currentLevelBaseXp: calculateLevelBaseXp(user.level),
            nextLevelXp: calculateNextLevelXp(user.level)
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getCurrentUser,
    updateProfile
};