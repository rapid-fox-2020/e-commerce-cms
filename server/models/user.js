'use strict';
const { hashPassword } = require("../helpers/bcrypt.js")
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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Password is required"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Role is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate((instance,options)=>{
    const saltRounds = 10
    instance.password = hashPassword(instance.password, saltRounds)
  })
  return User;
};
