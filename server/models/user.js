"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
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
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "email cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "email cannot empty!",
          },
          async checkEmail(email) {
            const checkEmails = await User.findOne({ where: { email: email } });
            if (checkEmails) {
              throw new Error("This email has been registered");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "password cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "password cannot empty!",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "role cannot empty!",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const newPassword = hashPassword(user.password);
          user.password = newPassword;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
