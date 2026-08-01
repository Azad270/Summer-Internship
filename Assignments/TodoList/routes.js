const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Todo Route Working!");
});

module.exports = router;