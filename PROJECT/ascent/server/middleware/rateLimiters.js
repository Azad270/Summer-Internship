const { rateLimit } = require("express-rate-limit");

const base = { standardHeaders: "draft-7", legacyHeaders: false };

// Whole API: generous, just a backstop against runaway clients.
const apiLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 600 });

// Only FAILED logins count, so normal users are never throttled by their own successful logins.
const loginLimiter = rateLimit({
    ...base,
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true,
    message: { success: false, message: "Too many login attempts. Try again later." },
});

const registerLimiter = rateLimit({
    ...base,
    windowMs: 60 * 60 * 1000,
    limit: 10,
    message: { success: false, message: "Too many sign-ups from this address. Try again later." },
});

module.exports = { apiLimiter, loginLimiter, registerLimiter };
