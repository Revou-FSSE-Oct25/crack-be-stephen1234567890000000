"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/yoga.jpg",
      },
      {
        name: "Yoga Class",
      },
    );

    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/hiit.jpg",
      },
      {
        name: "HIIT Workout",
      },
    );

    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/strength.jpg",
      },
      {
        name: "Strength Training",
      },
    );

    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/zumba.jpg",
      },
      {
        name: "Zumba Dance",
      },
    );

    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/pilates.jpg",
      },
      {
        name: "Pilates",
      },
    );

    await queryInterface.bulkUpdate(
      "Services",
      {
        imageUrl: "/images/crossfit.jpg",
      },
      {
        name: "CrossFit",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkUpdate("Services", { imageUrl: null }, {});
  },
};
