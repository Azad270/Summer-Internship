const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createHabit, updateHabit, getHabits, toggleHabit, deleteHabit, exportHabitsCSV } = require("../controllers/habitController");

router.use(authMiddleware);
router.get('/export',exportHabitsCSV);
router.route("/")
    .post(createHabit)
    .get(getHabits);

router.route("/:id").delete(deleteHabit);
router.route("/:id/toggle").put(toggleHabit);
router.put('/:id', updateHabit);

module.exports = router;