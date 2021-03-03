/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tagName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '标签名称'
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '标签颜色'
    }
  }, {
    sequelize,
    tableName: 'tags',
    timestamps: false,
    paranoid: true
  });
};
