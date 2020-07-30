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
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty!'
        },
        notNull: {
          msg: 'email cannot be empty!'
        },
        isEmail: {
          msg: 'email format should be for example: "johndoe@mail.com"'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty!'
        },
        notNull: {
          msg: 'password cannot be empty!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'role cannot be empty!'
        },
        notNull: {
          msg: 'role cannot be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
