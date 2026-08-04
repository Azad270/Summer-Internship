

// Exponential curve: Level 1 requires 100 XP, Level 2 requires ~282 XP, Level 3 requires ~519 XP...
const calculateNextLevelXp = (level) => {
    return Math.floor(100 * Math.pow(level, 1.5));
};

const calculateLevelBaseXp = (level) => {
    if (level <= 1) return 0; 
    return calculateNextLevelXp(level - 1);
};

// Determine Rank based on Level
const calculateRank = (level) => {
    if (level >= 50) return "S";
    if (level >= 40) return "A";
    if (level >= 30) return "B";
    if (level >= 20) return "C";
    if (level >= 10) return "D";
    return "E";
};

// Mutates the user object if they pass the threshold
const processExpGain = (user) => {
    let nextXpThreshold = calculateNextLevelXp(user.level);
    let leveledUp = false;

    // Use a while loop in case they gain enough XP to skip multiple levels at once
    while (user.xp >= nextXpThreshold) {
        user.level += 1;
        leveledUp = true;
        nextXpThreshold = calculateNextLevelXp(user.level);
    }

    if (leveledUp) {
        user.rank = calculateRank(user.level);
    }

    return leveledUp;
};

module.exports = { processExpGain, calculateNextLevelXp, calculateLevelBaseXp};