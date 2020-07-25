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
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Name cannot Empty"
        },
        notEmpty:{
          msg: "Name cannot Empty"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        notNull:{
          msg: "Price cannot be empty"
        },
        notEmpty:{
          msg: "Price cannot be empty"
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        notNull:{
          msg: "Stock cannot be empty"
        },
        notEmpty:{
          msg: "Stock cannot be empty"
        }
      }
    },
    img_url: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "img_url cannot Empty"
        },
        notEmpty:{
          msg: "img_url cannot Empty"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};