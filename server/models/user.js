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
         validate: {
            isEmail: { msg: "Wrong email format" },
            notEmpty: { msg: "Email cannot be empty" }
         }
      },
      password: {
         type: DataTypes.STRING,
         validate: {
            notEmpty: { msg: "Password cannot be empty" }
         }
      },
      role: {
         type: DataTypes.STRING
      }
   }, {
      hooks: {
         beforeCreate: (user) => {
            if (user.role == "") {
               user.role = "admin"
            }
         }
      },
      sequelize,
      modelName: 'User',
   });
   return User;
};