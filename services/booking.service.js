const { where } = require("sequelize");
const { Booking, Schedule } = require("../models/index");
const { Op } = require("sequelize");

class BookingService {
  static async createBooking(UserId, ScheduleId) {
    const transaction = await Booking.sequelize.transaction();
    try {
      // console.log(ScheduleId, "idd");

      const schedule = await Schedule.findByPk(ScheduleId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      // console.log(schedule, "ini schedule");

      if (!schedule) {
        throw {
          statusCode: 404,
          message: "Schedule not found",
        };
      }

      if (schedule.capacity <= 0) {
        throw {
          statusCode: 400,
          message: "No available capacity for this schedule",
        };
      }

      const existingBooking = await Booking.findOne({
        where: { UserId, ScheduleId, status: "confirmed" },
        transaction,
      });

      if (existingBooking) {
        throw {
          statusCode: 400,
          message: "User already has a confirmed booking for this schedule",
        };
      }

      const conflictBook = await Booking.findOne({
        include: [
          {
            model: Schedule,
            where: {
              date: schedule.date,
              [Op.and]: [
                { startTime: { [Op.lt]: schedule.endTime } },
                { startTime: { [Op.gt]: schedule.startTime } },
              ],
            },
          },
        ],
        where: UserId,
        status: "confirmed",
      });

      if (conflictBook) {
        throw {
          statusCode: 400,
          message: "You have another booking at overlapping time",
        };
      }

      const booking = await Booking.create(
        {
          UserId,
          ScheduleId,
          status: "pending",
        },
        { transaction },
      );

      schedule.capacity -= 1;
      await schedule.save({ transaction });
      await transaction.commit();
      return booking;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = BookingService;
