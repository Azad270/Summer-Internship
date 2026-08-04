const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getDailyActions } = require("../controllers/dashboardController");

// Protect all dashboard routes
router.use(authMiddleware);

// GET /api/dashboard/daily?date=YYYY-MM-DD
router.route("/daily").get(getDailyActions);

module.exports = router;