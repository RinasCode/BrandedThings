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
      name: 'Casual T-Shirt',
      description: 'Comfortable and stylish casual t-shirt',
      price: 20000,
      stock: 50,
      imgUrl: 'https://example.com/images/casual-tshirt.jpg',
      categoryId: 1, // Pastikan categoryId ini ada di tabel Categories
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Formal Suit',
      description: 'Elegant formal suit for special occasions',
      price: 150000,
      stock: 20,
      imgUrl: 'https://example.com/images/formal-suit.jpg',
      categoryId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Running Shoes',
      description: 'Durable and comfortable running shoes',
      price: 75000,
      stock: 100,
      imgUrl: 'https://example.com/images/running-shoes.jpg',
      categoryId: 3,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Streetwear Hoodie',
      description: 'Trendy streetwear hoodie for everyday wear',
      price: 50000,
      stock: 30,
      imgUrl: 'https://example.com/images/streetwear-hoodie.jpg',
      categoryId: 4,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fashionable Sunglasses',
      description: 'Stylish sunglasses to complete your look',
      price: 30000,
      stock: 70,
      imgUrl: 'https://example.com/images/fashionable-sunglasses.jpg',
      categoryId: 5,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  await queryInterface.bulkInsert("Products", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {})
  }
};
