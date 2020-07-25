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
                isEmail: {
                    msg: "Email not valid"
                },
                notEmpty: {
                    msg: "email is Required!"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Password is required!"
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Role is required!"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};