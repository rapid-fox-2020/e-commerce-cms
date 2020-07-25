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
      allowNull: false,
      validate: {
        notNull: {
          message: `name of product is required`,
        },
        notEmpty: {
          message: `name of product can not be empty`,
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: `image is required`,
        },
        notEmpty: {
          message: `image can not be empty`,
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: `price is required`,
        },
        notEmpty: {
          message: `price can not be empty`,
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: `stock is required`,
        },
        notEmpty: {
          message: `stock can not be empty`,
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};