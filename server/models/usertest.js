'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserTest.init({
    user_id: DataTypes.JSON,
    username: DataTypes.STRING,
    content: DataTypes.STRING,
    pictures: DataTypes.STRING,
    comment_id: DataTypes.JSON,
    like_id: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'UserTest',
  });
  return UserTest;
};