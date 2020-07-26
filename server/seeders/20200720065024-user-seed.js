'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        {
          name: 'Admin 1',
          email: 'admin@email.com',
          password: hashPassword('1234'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bukan Admin 1',
          email: 'bukanAdmin@email.com',
          password: hashPassword('1234'),
          role: 'bukanAdmin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null); 
  }
};
