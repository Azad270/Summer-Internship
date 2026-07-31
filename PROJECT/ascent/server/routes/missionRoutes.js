const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    getMissions,
    createMission,
    toggleMission,
    deleteMission,
    updateMission,
} = require("../controllers/missionController");

// Protect all routes with authMiddleware
router.use(authMiddleware);

router.route("/").get(authMiddleware, getMissions).post(authMiddleware, createMission);
router.route("/:id").put(authMiddleware, toggleMission).delete(authMiddleware, deleteMission);
router.route("/:id/edit").put(authMiddleware, updateMission)
module.exports = router;