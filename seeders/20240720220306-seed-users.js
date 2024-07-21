'use strict';
const { hash } = require('../helpers/bycrpt');
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
   const data = [
    {
      username: "RinaAdmin",
      email: "Rina@admin.com",
      password: hash("admin"),
      role: "Admin",
      phoneNumber: "081213141516",
      addres: "Jakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Admin",
      email: "admin@002.com",
      password: hash("admin"),
      role: "Admin",
      phoneNumber: "081213141516",
      addres: "Jakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Marcella",
      email: "marcela@mail.com",
      password: hash("12345"),
      role: "Staff",
      phoneNumber: "081213141516",
      addres: "Medan",
      createdAt: new Date(),
      updatedAt: new Date()
    }

   ]
   await queryInterface.bulkInsert("Users", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
