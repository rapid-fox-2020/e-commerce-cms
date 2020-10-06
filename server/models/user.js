'use strict';
const { hash, cheking } = require('../helpers/bcrypt')

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
        notEmpty: {
          msg: "Please enter valid email address"
        },
        notNull: {
          msg: "Please enter valid email address"
        },
        isEmail: {
          msg: "Invalid Email Format!"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 15],
          msg: 'Password length must be between 6 - 15 characters'
        },
        notEmpty: {
          msg: "Please enter password"
        },
        notNull: {
          msg: "Please enter password"
        },
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user, option) => {
        let newPassword = hash(user.password)
        user.password = newPassword
      }
    }
  });
  return User;
};