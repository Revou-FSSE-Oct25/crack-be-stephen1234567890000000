const express = require("express");
const router = express.Router();
const ScheduleController = require("../controller/schedule.controller");
const authMiddleware = require("../middleware/authentication.middleware");
const authorizedAdmin = require('../middleware/authoritazion.middleware');

// router.get("/", ScheduleController.getAllSchedules);
router.post("/", authMiddleware, authorizedAdmin, ScheduleController.createSchedule);

module.exports = router;