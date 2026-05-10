const { Schedule, Service, User } = require("../models/index");
const { Op } = require("sequelize");

class ScheduleService {
  static async createSchedule({
    ServiceId,
    TrainerId,
    date,
    startTime,
    endTime,
    capacity,
  }) {
    console.log(TrainerId, "id trainer");

    const service = await Service.findByPk(ServiceId);
    // console.log(service);

    if (!service) {
      throw {
        statusCode: 404,
        message: "Service not found",
      };
    }

    const trainer = await User.findByPk(TrainerId);
    console.log(trainer, "trainer");

    if (!trainer || trainer.role !== "trainer") {
      throw {
        statusCode: 404,
        message: "Trainer not found",
      };
    }

    if (new Date(`${date}T${startTime}`) >= new Date(`${date}T${endTime}`)) {
      throw {
        statusCode: 400,
        message: "Start time must be before end time",
      };
    }

    const conflictingSchedule = await Schedule.findOne({
      where: {
        TrainerId,
        date,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [startTime, endTime],
            },
          },
        ],
      },
    });

    if (conflictingSchedule) {
      throw {
        statusCode: 400,
        message: "Trainer has a conflicting schedule",
      };
    }

    const schedule = await Schedule.create({
      ServiceId,
      TrainerId,
      date,
      startTime,
      endTime,
      capacity,
    });

    return schedule;
  }

  static async getAllSchedules(ServiceId) {
    // console.log(ServiceId);
    
    const schedules = await Schedule.findAll({
      where: { ServiceId },
      include: [
        {
          model: Service,
          attributes: ["name", "duration", "description", "price"],
        },
        {
          model: User
        }
      ],
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });

    return schedules;
  }

  static async deleteSchedule(id) {
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      throw {
        statusCode: 404,
        message: "Schedule not found",
      };
    }

    await schedule.destroy();

    return true;
  }
}

module.exports = ScheduleService;
