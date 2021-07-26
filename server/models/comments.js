'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comments.init({
    content: DataTypes.STRING,
    user_id: DataTypes.JSON,
    post_id: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};