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
        notEmpty: {
          msg: 'name cannot be empty!'
        },
        notNull: {
          msg: 'name cannot be empty!'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'image url cannot be empty!'
        },
        notNull: {
          msg: 'image url cannot be empty!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price cannot be empty!'
        },
        notNull: {
          msg: 'price cannot be empty!'
        },
        isNumeric: {
          msg: "price must be a number!"
        },
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'stock cannot be empty!'
        },
        notNull: {
          msg: 'stock cannot be empty!'
        },
        isNumeric: {
          msg: "stock must be a number!"
        },
        min: 1
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};