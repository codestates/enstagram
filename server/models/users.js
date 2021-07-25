'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    post_id: DataTypes.JSON,
    comment_id: DataTypes.JSON,
    like_id: DataTypes.JSON,
    follower_id: DataTypes.JSON,
    following_id: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};