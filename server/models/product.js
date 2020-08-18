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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Name is required"
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      validate:{
        isUrl:{
          args:true,
          msg:"Wrong URL for Image"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args:true,
          msg:"Price must be in number format"
        },
        checkPrice(value){
          if(+value <= 10000){
            throw new Error('Price must be greater than 10000');
          }
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args:true,
          msg:"Stock must be in number format"
        },
        checkStock(value){
          if(+value <= 0){
            throw new Error('Stock must be greater than 0')
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Category is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
