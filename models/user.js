'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require ('../helpers/bycrpt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notEmpty : {
          msg : "Username is required"
        },
        notNull : {
          msg : "Username is required"
        },
      }
      },

    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notEmpty : {
          msg : "Email is required"
        },
        notNull : {
          msg : "Email is required"
        },
        isEmail : {
          msg : "Invalid email"
        }
      }
      },

    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password is required"
        },
        notEmpty : {
          msg : "Password is required"
        },
        len : {
          args : [5],
          msg :"Minimum password characters is 5"
        }
      }
    },

    role: {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "Staff"
    },

    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "PhoneNumber is required"
        },
        notEmpty : "PhoneNumber is required"
      }
    },

    addres: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Addres is required"
        },
        notNull : {
          msg : "Addres is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(function(instance, option){
    instance.password = hash(instance.password)
  })
  return User;
};