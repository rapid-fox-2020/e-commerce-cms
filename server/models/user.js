'use strict';
const { hashPassword, checkPassword } = require('../helpers/bcrypt')
console.log(typeof hashPassword);
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin"
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        console.log(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};