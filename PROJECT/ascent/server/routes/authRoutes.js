const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { loginLimiter, registerLimiter } = require("../middleware/rateLimiters");

const {
    registerUser,
    loginUser,
    verifyToken
} = require("../controllers/authController");


// Register
router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.get(
    "/verify",
    authMiddleware,
    verifyToken
);

module.exports = router;