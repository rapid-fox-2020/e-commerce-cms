'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', 
    [
      {
        email: 'admin3@email.com',
        password: bcrypt.hashSync("12345",saltRounds),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@email.com',
        password: bcrypt.hashSync("abcde",saltRounds),
        role: "unknown",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
