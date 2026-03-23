const BookingService = require("../services/booking.service");

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const UserId  = req.user.id;
      const { ScheduleId } = req.body;
      console.log(ScheduleId, "tes");
      

      const result = await BookingService.createBooking(
        UserId,
        ScheduleId,
      );

      if (!result) {
        return next({
          statusCode: 404,
          message: "Failed to create booking",
        });
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getMyBookings(req, res, next) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
