const express = require("express");
const router = express.Router();
const authRouter = require("./auth.router");
const serviceRouter = require("./service.router");
const scheduleRouter = require("./schedule.router");

router.use("/auth", authRouter);
router.use("/services", serviceRouter);
router.use("/schedules", scheduleRouter);

module.exports = router;