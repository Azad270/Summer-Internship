// Tiny validation helpers (no dependency). Everything checks typeof first so
// objects like {"$ne": null} can never reach a Mongo query.
const OBJECT_ID_RE = /^[a-f\d]{24}$/i; // strict: mongoose.isValidObjectId also accepts any 12-char string

const isId = (v) => typeof v === "string" && OBJECT_ID_RE.test(v);

// Required text: returns trimmed string, or null if missing / wrong type / too long.
const requiredText = (v, max) => {
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t.length > 0 && t.length <= max ? t : null;
};

// Optional text: undefined -> "", otherwise trimmed string, or null if wrong type / too long.
const optionalText = (v, max) => {
    if (v === undefined || v === null) return "";
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t.length <= max ? t : null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmail = (v) => typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v);

// bcrypt only uses the first 72 bytes, so reject longer passwords instead of silently truncating.
const isAcceptablePassword = (v) =>
    typeof v === "string" && v.length >= 8 && Buffer.byteLength(v, "utf8") <= 72;

// Express middleware: 400 on a malformed :id param instead of a Mongoose CastError -> 500.
const validateIdParam = (req, res, next) => {
    if (!isId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }
    next();
};

module.exports = { isId, requiredText, optionalText, isEmail, isAcceptablePassword, validateIdParam };
