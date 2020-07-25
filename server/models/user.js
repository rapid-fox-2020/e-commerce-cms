'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
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
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: "Username cannot Empty"
        },
        notEmpty:{
          msg: "Username cannot Empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      valide:{
        notNull: {
          msg: "Password cannot Empty"
        },
        notEmpty:{
          msg: "Password cannot Empty"
        }
      }
    },
    role: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate',(user,option) => {
    user.password = bcrypt.hashSync(user.password,salt)
  })
  return User;
};