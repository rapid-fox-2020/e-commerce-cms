'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Products', [{
       name: 'Baju 1',
       image_url: 'www.google.com',
       price: 100000,
       stock: 10,
       createdAt: new Date(),
       updatedAt: new Date()
     }, {
        name: 'Baju 2',
        image_url: 'www.google.com',
        price: 100000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
         name: 'Baju 3',
         image_url: 'www.google.com',
         price: 100000,
         stock: 10,
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Products', null, {})
  }
};
