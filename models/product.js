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
      Product.belongsTo(models.User, { foreignKey: "authorId" })
      Product.belongsTo(models.Category, { foreignKey: "categoryId" })
    }
  }
  Product.init({
    name: { 
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "Name is required"
        },
        notEmpty : {
          msg : "Name is required"
        },
      }
    },

    description:  { 
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "Description is required"
        },
        notEmpty : {
          msg : "Description is required"
        }
      }
    },

    price:  {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "Price is required"
        },
        notEmpty : {
          msg : "Price is required"
        },
        min : {
          args : 10_000,
          msg : "Minimum price is 10.000"
        }
      }
    },

    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "Stock is required"
        },
        notEmpty : {
          msg : "Stock is required"
        }
      }
    },

    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "ImgUrl is required"
        },
        notEmpty : {
          msg : "ImgUrl is required"
        }
      }
    },
    categoryId: { 
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "categoryId is required"
        },
        notEmpty : {
          msg : "categoryId is required"
        }
      }
    },

    authorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {
          msg : "authorId is required"
        },
        notEmpty : {
          msg : "authorId is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};