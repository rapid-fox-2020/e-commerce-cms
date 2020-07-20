'use strict';
const { hashPassword } = require("../helpers/bcrypt.js")
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
       email: 'abcde@gmail.com',
       password: hashPassword("abcde",10),
       role: "Admin",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
        email: 'fghij@gmail.com',
        password: hashPassword("fghij",10),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
         email: 'klmno@gmail.com',
         password: hashPassword("klmno",10),
         role: "Admin",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
          email: 'pqrst@gmail.com',
          password: hashPassword("pqrst",10),
          role: "Buyer",
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
     return queryInterface.bulkDelete('Users', null, {});
  }
};
