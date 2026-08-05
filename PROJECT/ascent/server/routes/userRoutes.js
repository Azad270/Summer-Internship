const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getCurrentUser, updateProfile } = require("../controllers/userController");

// Get logged-in user's profile
router.get(
    "/me",
    authMiddleware,
    getCurrentUser
);

// Update logged-in user's profile (Avatar)
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

module.exports = router;