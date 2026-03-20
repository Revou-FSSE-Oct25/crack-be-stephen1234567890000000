'use strict';
require('dotenv').config();
const { hashPassword } = require('../utils/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Users", [{
    name: "Trainer",
    email: "trainer@mail.com",
    password: hashPassword(process.env.TRAINNER_PASSWORD),
    role: "trainer",
    createdAt: new Date(),
    updatedAt: new Date(),
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;`)
  }
};
