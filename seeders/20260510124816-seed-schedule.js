"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Schedules", [
      {
        ServiceId: 1,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "11:30",
        endTime: "12:00",
        capacity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ServiceId: 2,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "18:30",
        endTime: "19:00",
        capacity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ServiceId: 3,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "13:30",
        endTime: "14:00",
        capacity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ServiceId: 4,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "14:30",
        endTime: "15:00",
        capacity: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ServiceId: 5,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "15:30",
        endTime: "16:00",
        capacity: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ServiceId: 6,
        TrainerId: 2,
        date: new Date("2026-05-15"),
        startTime: "16:30",
        endTime: "17:00",
        capacity: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("Schedules", null, {});
  },
};
