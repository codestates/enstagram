'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  };
  User.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    accountName: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};