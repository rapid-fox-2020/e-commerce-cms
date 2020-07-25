"use strict";
const { Model } = require("sequelize");
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
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "name cannot empty",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "image cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "image cannot empty",
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "price cannot empty",
          },
          isNumeric: {
            args: true,
            msg: "wrong price format",
          },
          checkPrice(value) {
            if (value < 1) {
              throw new Error("Price must be greater than 0");
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "stock cannot empty",
          },
          isNumeric: {
            args: true,
            msg: "wrong stock format",
          },
          checkStock(value) {
            if (value < 1) {
              throw new Error("stock must be greater than 0");
            }
          },
          isNumeric: {
            args: true,
            msg: "wrong stock format",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "category cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "category cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
