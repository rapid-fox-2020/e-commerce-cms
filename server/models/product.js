'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Name is required!'
                }
            }
        },
        image_url: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'image_url is required!'
                }
            }
        },
        price: {
            type: DataTypes.FLOAT,
            validate: {
                notEmpty: {
                    msg: 'price is required!'
                },
                isNumeric: {
                    msg: "Price must number!"
                },
                min: {
                    args: [0],
                    msg: 'cannot input less than 1'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'stock is required!'
                },
                isNumeric: {
                    msg: 'stock must Number!'
                },
                min: {
                    args: [0],
                    msg: 'cannot input less than 1'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};