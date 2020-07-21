'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users',
         [
            {
               email: "admin@mail.com",
               password: hashPassword("12345"),
               role: "admin",
               createdAt: new Date(),
               updatedAt: new Date()
            }
         ], {})
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
   }
};
