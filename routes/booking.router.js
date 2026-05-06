const express = require("express");
const router = express.Router();
const BookingController = require("../controller/booking.controller");
const authMiddleware = require("../middleware/authentication.middleware");
const authorizedAdmin = require("../middleware/authoritazion.middleware");

router.get("/my-bookings", authMiddleware, BookingController.getMyBookings);
router.get(
  "/admin/all",
  authMiddleware,
  authorizedAdmin,
  BookingController.findAllByAdmin,
);
router.post("/", authMiddleware, BookingController.createBooking);

router.patch("/:id/cancel", authMiddleware, BookingController.cancelBooking);
router.patch("/:id/reSchedule", authMiddleware, BookingController.reSchedule);
router.patch("/:id/complete", authMiddleware, BookingController.complete);

module.exports = router;
