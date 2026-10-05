const User = require("../models/User");
const { deriveProgress, calculateNextLevelXp, calculateLevelBaseXp } = require("../utils/progression");

// Atomic XP change. $inc can't lose updates under concurrent requests; level and rank
// are then recomputed from the resulting xp (never trusted from an earlier read).
// Returns the fresh user document, or null if the user doesn't exist.
const awardXp = async (userId, delta) => {
    let user = await User.findByIdAndUpdate(userId, { $inc: { xp: delta } }, { new: true });
    if (!user) return null;

    const { xp, level, rank } = deriveProgress(user.xp);
    if (xp !== user.xp || level !== user.level || rank !== user.rank) {
        user = await User.findByIdAndUpdate(userId, { $set: { xp, level, rank } }, { new: true });
    }
    return user;
};

// The shape the React context expects after any XP change.
const progressPayload = (user) => ({
    user,
    currentLevelBaseXp: calculateLevelBaseXp(user.level),
    nextLevelXp: calculateNextLevelXp(user.level),
});

module.exports = { awardXp, progressPayload };
