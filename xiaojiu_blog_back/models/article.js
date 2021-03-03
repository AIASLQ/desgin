'use strict';
const {
    Model
} = require('sequelize');
console.log('wrrfwf')
console.log('wrrfwf')
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // 在此处定义关联 表示文章下面有很多评论
            models.Article.hasMany(models.Comment)
            models.Article.belongsTo(models.Type)
            models.Article.belongsTo(models.User)
        }
    };
    Article.init({
        title: DataTypes.STRING,
        desc: DataTypes.STRING,
        content: DataTypes.TEXT,
        coverImg: DataTypes.STRING,
        status: DataTypes.BIGINT,
        typeId: DataTypes.BIGINT,
        userId: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Article',
    });
    return Article;
};