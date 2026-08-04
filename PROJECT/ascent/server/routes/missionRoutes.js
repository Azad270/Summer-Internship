const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    getMissions,
    createMission,
    toggleMission,
    deleteMission,
    updateMission,
    getMissionHistory,
} = require("../controllers/missionController");

// Protect all routes with authMiddleware
router.use(authMiddleware);

router.route("/").get(getMissions).post(createMission);

// FIX: This MUST be "/history", and it MUST be above "/:id"
router.route("/history").get(getMissionHistory);

router.route("/:id").put(toggleMission).delete(deleteMission);
router.route("/:id/edit").put(updateMission);

module.exports = router;