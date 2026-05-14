"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Bookings",
      "unique_user_schedule_booking",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Bookings", {
      fields: ["UserId", "ScheduleId"],
      type: "unique",
      name: "unique_user_schedule_booking",
    });
  },
};
