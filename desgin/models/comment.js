'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * 用于定义关联的帮助器方法。
     * 此方法不是Sequelize生命周期的一部分。
     * models/index”文件将自动调用此方法。
     */
    static associate(models) {
      // 在此处定义关联 表示评论关联于文章下
      models.Comment.belongsTo(models.Article)
    }
  };
  Comment.init({
    articleId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};