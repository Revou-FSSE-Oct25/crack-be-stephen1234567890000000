const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/authentication.middleware");

router.get("/me", authMiddleware, AuthController.getMe);
router.put("/me", authMiddleware, AuthController.updateMe);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
