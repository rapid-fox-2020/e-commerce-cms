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
            notEmpty: true
         }
      },
      imageUrl: {
         type: DataTypes.TEXT,
         validate: {
            isUrl: true
         }
      },
      price: {
         type: DataTypes.DOUBLE,
         validate: {
            isNumeric: true
         }
      },
      stock: {
         type: DataTypes.INTEGER,
         validate: {
            isNumeric: true
         }
      }
   }, {
      sequelize,
      modelName: 'Product',
   });
   return Product;
};