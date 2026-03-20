const ScheduleService = require("../services/schedule.service");

class ScheduleController {
  static async createSchedule(req, res, next) {
    try {
      const { ServiceId, TrainerId, date, startTime, endTime, capacity } =
        req.body;

      console.log(TrainerId, "trainer");

      const result = await ScheduleService.createSchedule({
        ServiceId,
        TrainerId,
        date,
        startTime,
        endTime,
        capacity,
      });

      if (!result) {
        return next({
          statusCode: 404,
          message: "Failed to create schedule",
        });
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllSchedules(req, res, next) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ScheduleController;
