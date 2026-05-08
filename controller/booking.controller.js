const BookingService = require("../services/booking.service");

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const UserId = req.user.id;
      const { ScheduleId } = req.body;
      console.log(ScheduleId, "tes");

      const result = await BookingService.createBooking(UserId, ScheduleId);

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
      const UserId = req.user.id;
      const result = await BookingService.getMyBookings(UserId);

      if (!result) {
        return next({
          statusCode: 404,
          message: "All bookings undefined",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async cancelBooking(req, res, next) {
    try {
      const UserId = req.user.id;
      const { id } = req.params;

      const result = await BookingService.cancelBooking(UserId, id);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Cannot cancel booking",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async reSchedule(req, res, next) {
    try {
      const UserId = req.user.id;
      const { id } = req.params;
      const { newScheduleId } = req.body;

      const result = await BookingService.reSchedule(id, newScheduleId, UserId);

      if (!result) {
        return next({
          statusCode: 404,
          message: "undefined Schedule",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findAllByAdmin(req, res, next) {
    try {
      const result = BookingService.findAllByAdmin();

      if (!result) {
        return next({
          statusCode: 404,
          message: "undefined all booking",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async complete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;

      const result = await BookingService.complete(id, user);
      if (!result) {
        return next({
          statusCode: 404,
          message: "Booking not found",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookingController;
