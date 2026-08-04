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
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getCurrentUser,
};