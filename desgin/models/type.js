'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Type.hasMany(models.Article)
    }
  };
  Type.init({
    className: DataTypes.STRING,
    classDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};