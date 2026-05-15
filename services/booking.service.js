const { where } = require("sequelize");
const {
  Booking,
  Schedule,
  User,
  sequelize,
  Service,
} = require("../models/index");
const { Op } = require("sequelize");
const { lock } = require("../routes");

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
                { endTime: { [Op.gt]: schedule.startTime } },
              ],
            },
          },
        ],
        where: {
          UserId,
          status: "confirmed",
        },
        transaction,
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
          status: "confirmed",
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

  static async getMyBookings(UserId) {
    const myBookings = await Booking.findAll({
      where: { UserId },
      include: [
        {
          model: Schedule,
          include: [
            {
              model: User,
              attribute: ["id", "name", "email"],
            },
            {
              model: Service,
            },
          ],
        },
      ],
      order: [[{ model: Schedule }, "date", "ASC"]],
      order: [[{ model: Schedule }, "startTime", "ASC"]],
    });

    return myBookings;

    // const formatted = myBookings.map((b) => ({
    //   id: b.id,
    //   status: b.status,
    //   date: b.Schedule.date,
    //   startTime: b.Schedule.startTime,
    //   endTime: b.Schedule.endTime,
    //   trainerName: b.Schedule.User.name,
    // }));

    // return formatted;
  }

  static async cancelBooking(UserId, bookingId) {
    const transaction = await sequelize.transaction();
    try {
      const booking = await Booking.findByPk(bookingId, {
        transaction: transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!booking) {
        throw {
          statusCode: 404,
          message: "Booking not found",
        };
      }

      if (booking.UserId !== UserId) {
        throw {
          statusCode: 403,
          message: "Forbidden action",
        };
      }

      if (booking.status !== "confirmed") {
        throw {
          statusCode: 400,
          message: "Booking status are not confirmed",
        };
      }

      const schedule = await Schedule.findByPk(booking.ScheduleId, {
        transaction: transaction,
        lock: transaction.LOCK.UPDATE,
      });

      const scheduleTimeDate = new Date(
        schedule.date + " " + schedule.startTime,
      );

      const now = new Date();

      const diff = (scheduleTimeDate - now) / (1000 * 600 * 60);

      if (diff < 2) {
        throw {
          statusCode: 400,
          message: "Too late to cancel",
        };
      }

      booking.status = "cancelled";
      await booking.save({ transaction: transaction });

      schedule.capacity += 1;
      await schedule.save({ transaction: transaction });

      await transaction.commit();

      return booking;
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR NAME:", error.name);
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR ERRORS:", error.errors);
      console.log("ERROR PARENT:", error.parent);
      await transaction.rollback();
      throw error;
    }
  }

  static async reSchedule(bookingId, newScheduleId, UserId) {
    const transaction = await sequelize.transaction();
    try {
      const booking = await Booking.findByPk(bookingId, {
        include: Schedule,
        transaction: transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!booking) {
        throw {
          statusCode: 404,
          message: "Booking not found",
        };
      }

      if (booking.UserId !== UserId) {
        throw {
          statusCode: 403,
          message: "Forbidden action",
        };
      }

      if (booking.status !== "pending") {
        throw {
          statusCode: 400,
          message: "Cannot reSchedule",
        };
      }

      const newSchedule = await Schedule.findByPk(newScheduleId, {
        transaction: transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!newSchedule) {
        throw {
          statusCode: 404,
          message: "Schedule not found",
        };
      }

      if (newSchedule.capacity <= 0) {
        throw {
          statusCode: 400,
          message: "Slot full",
        };
      }

      booking.Schedule.capacity += 1;
      await booking.Schedule.save({ transaction: transaction });

      newSchedule.capacity -= 1;
      await newSchedule.save({ transaction: transaction });

      booking.ScheduleId = newSchedule;
      booking.status = "confirmed";

      await booking.save({ transaction: transaction });

      await transaction.commit();

      return booking;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async findAllByAdmin() {
    const booking = await Booking.findAll({
      include: [
        {
          model: Schedule,
          include: [
            {
              model: User,
            },
            {
              model: Service,
            },
          ],
        },
      ],
      order: [[{ model: Schedule }, "date", "ASC"]],
    });

    return booking;
  }

  static async complete(bookingId, user) {
    console.log(bookingId, "ini booking");

    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: Schedule,
        include: [User],
      },
    });

    if (!booking) {
      throw {
        statusCode: 404,
        message: "Booking not found",
      };
    }

    if (user.role !== "admin" && user.id !== booking.Schedule.TrainerId) {
      throw {
        statusCode: 403,
        message: "Forbidden action",
      };
    }

    if (booking.status !== "confirmed") {
      throw {
        statusCode: 400,
        message: "Booking is not confirmed",
      };
    }

    const scheduleEnd = new Date(
      booking.Schedule.date + " " + booking.Schedule.endTime,
    );

    const now = new Date();

    if (now < scheduleEnd) {
      throw {
        statusCode: 400,
        message: "Too early to complete",
      };
    }

    booking.status = "completed";
    await booking.save();
    return booking;
  }
}

module.exports = BookingService;
