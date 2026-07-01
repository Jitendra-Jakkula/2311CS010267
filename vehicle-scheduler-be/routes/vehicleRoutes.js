const express = require("express");

const router = express.Router();

const {
    getSchedule
} = require("../controllers/vehicleController");

router.get("/schedule", getSchedule);

module.exports = router;