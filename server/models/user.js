'use strict';
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          message: `email is required`,
        },
        notEmpty: {
          message: `email can not be empty`,
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: `password is required`,
        },
        notEmpty: {
          message: `password can not be empty`,
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: `role is required`,
        },
        notEmpty: {
          message: `role can not be empty`,
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};