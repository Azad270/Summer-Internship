/**
 * Calculates the current streak based on an array of completion dates.
 * Utilizes Lazy Evaluation to determine streak strictly at request time.
 * 
 * @param {Array} datesArray - Array of dates (strings or Date objects)
 * @returns {Number} - The current isolated streak
 */
const calculateCurrentStreak = (datesArray) => {
    if (!datesArray || !Array.isArray(datesArray) || datesArray.length === 0) {
        return 0;
    }

    // 1. Sanitize, Normalize, and Deduplicate
    // Converts everything to exact YYYY-MM-DD format (UTC) and removes duplicates
    const uniqueDates = [...new Set(datesArray.map(date => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return null; // Drop invalid data
        return d.toISOString().split('T')[0];
    }).filter(Boolean))];

    if (uniqueDates.length === 0) return 0;

    // 2. Sort chronologically (newest to oldest)
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    // 3. Define the Anchors
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let currentStreak = 0;
    let pointer = 0;
    const lastActive = uniqueDates[0];

    // 4. Validate Anchor (Is the streak alive right now?)
    if (lastActive === todayStr) {
        currentStreak = 1;
        pointer = 1;
    } else if (lastActive === yesterdayStr) {
        currentStreak = 1;
        pointer = 1; 
    } else {
        // The most recent date is 2+ days ago. Streak is dead.
        return 0;
    }

    // 5. Walk backwards to count the unbroken chain
    let checkDate = new Date(lastActive);
    
    while (pointer < uniqueDates.length) {
        // Step back exactly one day
        checkDate.setDate(checkDate.getDate() - 1);
        const expectedStr = checkDate.toISOString().split('T')[0];

        if (uniqueDates[pointer] === expectedStr) {
            currentStreak++;
            pointer++;
        } else {
            // The chain is broken. Stop counting.
            break;
        }
    }

    return currentStreak;
};

module.exports = { calculateCurrentStreak };