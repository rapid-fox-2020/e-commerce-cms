'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    hooks:{
      beforeSave(user){
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};