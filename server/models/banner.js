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

    static generateForm(data) {
      let obj = {
        name: data.name, 
        image_url: data.image_url,
        description: data.description,
        status: data.status
      }

      return obj
    }
  };
  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name is required.`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Description is required.`
        },
        notEmpty: {
          args: true,
          msg: `Description must be filled!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Image is required.`
        },
        notEmpty: {
          args: true,
          msg: `Image must be provided!`
        },
        isUrl: {
          args: true,
          msg: `Image must be in URL format!`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Status is required.`
        },
        notEmpty: {
          args: true,
          msg: `Status must be filled!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};