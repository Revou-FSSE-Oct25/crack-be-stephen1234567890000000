const express = require("express");
const router = express.Router();  
const BookingController = require("../controller/booking.controller");
const authMiddleware = require("../middleware/authentication.middleware");

router.post("/", authMiddleware, BookingController.createBooking);
router.get("/my-bookings", authMiddleware, BookingController.getMyBookings);

module.exports = router;