// PLACEHOLDER interim table. The client no longer decides XP; the server maps
// difficulty -> XP. Phase 1 replaces this with a (domain, difficulty) table.
const XP_BY_DIFFICULTY = Object.freeze({
    Easy: 10,
    Medium: 20,
    Hard: 40,
    Elite: 80,
    Master: 120,
    GrandMaster: 200,
});

const DIFFICULTIES = Object.freeze(Object.keys(XP_BY_DIFFICULTY));

const isValidDifficulty = (d) =>
    typeof d === "string" && Object.prototype.hasOwnProperty.call(XP_BY_DIFFICULTY, d);

const xpForDifficulty = (d) => XP_BY_DIFFICULTY[d];

module.exports = { XP_BY_DIFFICULTY, DIFFICULTIES, isValidDifficulty, xpForDifficulty };
