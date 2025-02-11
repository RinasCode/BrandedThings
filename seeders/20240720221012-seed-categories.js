'use strict';

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
      name: 'Casual Wear',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Formal Wear',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sportswear',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Streetwear',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Accessories',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  await queryInterface.bulkInsert("Categories", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
