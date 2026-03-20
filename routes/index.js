const express = require("express");
const router = express.Router();
const authRouter = require("./auth.router");
const serviceRouter = require("./service.router");

router.use("/auth", authRouter);
router.use("/services", serviceRouter);

module.exports = router;