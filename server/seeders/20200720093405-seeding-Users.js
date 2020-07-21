'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', 
    [
      {
        email: 'admin@email.com',
        password: bcrypt.hashSync("12345",saltRounds),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin2@email.com',
        password: bcrypt.hashSync("67890",saltRounds),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
