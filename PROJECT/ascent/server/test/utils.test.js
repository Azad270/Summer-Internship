const test = require("node:test");
const assert = require("node:assert/strict");
const { deriveProgress, calculateNextLevelXp, calculateLevelBaseXp } = require("../utils/progression");
const { calculateCurrentStreak } = require("../utils/streakCalculator");
const { isValidLocalDate, isAllowedClientDate, resolveToday } = require("../utils/dates");
const { isId, requiredText, isAcceptablePassword, isEmail } = require("../utils/validate");
const { xpForDifficulty, isValidDifficulty } = require("../utils/xpTable");

test("deriveProgress: level and rank follow xp in BOTH directions", () => {
    assert.deepEqual(deriveProgress(0), { xp: 0, level: 1, rank: "E" });
    assert.equal(deriveProgress(99).level, 1);
    assert.equal(deriveProgress(100).level, 2);
    // XP that earned level 10 / rank D...
    const up = deriveProgress(calculateLevelBaseXp(10));
    assert.equal(up.level, 10);
    assert.equal(up.rank, "D");
    // ...and rank drops when xp drops (the old bug: rank survived level-down)
    const down = deriveProgress(calculateLevelBaseXp(10) - 1);
    assert.equal(down.level, 9);
    assert.equal(down.rank, "E");
});

test("deriveProgress: bad input can't produce negative/NaN xp", () => {
    assert.equal(deriveProgress(-50).xp, 0);
    assert.equal(deriveProgress(NaN).level, 1);
});

test("level boundaries are consistent with the curve", () => {
    for (let l = 1; l < 60; l++) {
        assert.equal(deriveProgress(calculateNextLevelXp(l)).level, l + 1);
        assert.equal(deriveProgress(calculateNextLevelXp(l) - 1).level, l);
    }
});

test("isValidLocalDate is strict", () => {
    for (const ok of ["2026-10-05", "2024-02-29"]) assert.equal(isValidLocalDate(ok), true, ok);
    for (const bad of ["a", "b", "2099-1-1", "2026-13-01", "2026-02-30", "2025-02-29", " 2026-10-05", "2026-10-05T00:00:00Z", 20261005, null, undefined, {}, ["2026-10-05"]])
        assert.equal(isValidLocalDate(bad), false, String(bad));
});

test("isAllowedClientDate: window covers every real timezone, rejects farming dates", () => {
    const now = new Date("2026-10-05T01:00:00Z"); // 01:00 UTC
    assert.equal(isAllowedClientDate("2026-10-05", now), true);  // today (UTC)
    assert.equal(isAllowedClientDate("2026-10-06", now), true);  // UTC+14 user's local date
    assert.equal(isAllowedClientDate("2026-10-04", now), true);  // yesterday
    assert.equal(isAllowedClientDate("2026-10-03", now), true);  // oldest accepted day (yesterday for a user behind UTC)
    assert.equal(isAllowedClientDate("2026-10-02", now), false); // too old
    assert.equal(isAllowedClientDate("2026-10-07", now), false); // future
    assert.equal(isAllowedClientDate("2099-01-01", now), false);
    assert.equal(isAllowedClientDate("a", now), false);
});

test("resolveToday", () => {
    const now = new Date("2026-10-05T12:00:00Z");
    assert.equal(resolveToday(undefined, now), "2026-10-05");
    assert.equal(resolveToday("2026-10-06", now), "2026-10-06");
    assert.equal(resolveToday("nope", now), null);
});

test("streak: uses the CLIENT's today, not the server's", () => {
    const dates = ["2026-10-06", "2026-10-05", "2026-10-04"];
    // Client already on Oct 6 (ahead of UTC): streak is 3, not 0
    assert.equal(calculateCurrentStreak(dates, "2026-10-06"), 3);
});

test("streak: alive if last completion is today or yesterday, dead after that", () => {
    assert.equal(calculateCurrentStreak(["2026-10-04", "2026-10-03"], "2026-10-05"), 2);
    assert.equal(calculateCurrentStreak(["2026-10-03", "2026-10-02"], "2026-10-05"), 0);
    assert.equal(calculateCurrentStreak([], "2026-10-05"), 0);
});

test("streak: gaps break the chain; junk and duplicates are ignored", () => {
    assert.equal(calculateCurrentStreak(["2026-10-05", "2026-10-05", "2026-10-04", "2026-10-02"], "2026-10-05"), 2);
    assert.equal(calculateCurrentStreak(["a", "b", "2099-01-01", "2026-10-05"], "2026-10-05"), 1);
});

test("streak: month/year/leap boundaries", () => {
    assert.equal(calculateCurrentStreak(["2024-03-01", "2024-02-29", "2024-02-28"], "2024-03-01"), 3);
    assert.equal(calculateCurrentStreak(["2026-01-01", "2025-12-31", "2025-12-30"], "2026-01-01"), 3);
});

test("validators reject operator-injection style input", () => {
    assert.equal(isId("64b7f0c2a1b2c3d4e5f60718"), true);
    assert.equal(isId("aaaaaaaaaaaa"), false); // 12 chars: mongoose.isValidObjectId would accept this
    assert.equal(isId({ $ne: null }), false);
    assert.equal(requiredText({ $ne: null }, 30), null);
    assert.equal(requiredText("  hi  ", 30), "hi");
    assert.equal(requiredText("x".repeat(31), 30), null);
    assert.equal(isEmail({ $gt: "" }), false);
    assert.equal(isAcceptablePassword("short"), false);
    assert.equal(isAcceptablePassword("a".repeat(73)), false);
    assert.equal(isAcceptablePassword("longenough1"), true);
});

test("xp table: only known difficulties; prototype keys are not difficulties", () => {
    assert.equal(xpForDifficulty("Easy"), 10);
    assert.equal(isValidDifficulty("GrandMaster"), true);
    assert.equal(isValidDifficulty("constructor"), false);
    assert.equal(isValidDifficulty("__proto__"), false);
});
