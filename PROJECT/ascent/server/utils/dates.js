// All "local dates" are strict YYYY-MM-DD strings sent by the client.
// Math is done on UTC day numbers so server timezone / DST never matter.
const DAY_MS = 86400000;
const LOCAL_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isValidLocalDate = (s) => {
    if (typeof s !== "string" || !LOCAL_DATE_RE.test(s)) return false;
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
};

// Integer day index for a valid YYYY-MM-DD string.
const dayNumber = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / DAY_MS;
};

const utcToday = (now = new Date()) => now.toISOString().slice(0, 10);

// The server doesn't know the user's timezone, so "today or yesterday" can't be
// exact. A client's local "today" is always within UTC-1..UTC+1 days, so
// "today or yesterday" is within UTC-2..UTC+1. Tighten this once a timezone is stored.
const isAllowedClientDate = (s, now = new Date()) => {
    if (!isValidLocalDate(s)) return false;
    const diff = dayNumber(s) - dayNumber(utcToday(now));
    return diff >= -2 && diff <= 1;
};

// Returns the date to treat as "today" for a request, or null if the client sent junk.
const resolveToday = (clientToday, now = new Date()) => {
    if (clientToday === undefined) return utcToday(now);
    return isAllowedClientDate(clientToday, now) ? clientToday : null;
};

module.exports = { isValidLocalDate, dayNumber, utcToday, isAllowedClientDate, resolveToday };
