const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/service.controller");
const authMiddleware = require("../middleware/authentication.middleware");
const authorizedAdmin = require("../middleware/authoritazion.middleware");

router.get("/", ServiceController.getAllServices);
router.post(
  "/",
  authMiddleware,
  authorizedAdmin,
  ServiceController.createService,
);

router.get("/:id", ServiceController.getServiceById);
router.put(
  "/:id",
  authMiddleware,
  authorizedAdmin,
  ServiceController.updateService,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizedAdmin,
  ServiceController.deleteService,
);

module.exports = router;
