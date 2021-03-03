/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('types', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    className: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    classDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'types',
    timestamps: false,
    paranoid: true
  });
};
