'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    image_url: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL is Required"
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};
