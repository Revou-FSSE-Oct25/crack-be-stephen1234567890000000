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
      const {Serviceid} = req.params;

      const result = await ScheduleService.getAllSchedules(Serviceid);

      if (!result) {
        return next({
          statusCode: 404,
          message: "No schedules found",
        });
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ScheduleService.deleteSchedule(id);

      if (!result) {
        return next({
          statusCode: 404,
          message: "Schedule not found",
        });
      }

      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ScheduleController;
