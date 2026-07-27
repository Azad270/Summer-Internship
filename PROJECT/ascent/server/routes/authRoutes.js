const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    verifyToken
} = require("../controllers/authController");


// Register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(
    "/verify",
    authMiddleware,
    verifyToken
);

module.exports = router;