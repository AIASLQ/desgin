'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.User.hasMany(models.Article)
        }
    };
    User.init({
        mobile: DataTypes.BIGINT,
        password: DataTypes.STRING,
        nickname: DataTypes.STRING,
        avatar: DataTypes.STRING,
        type: DataTypes.BIGINT,
        sex: DataTypes.BIGINT,
        desc: DataTypes.STRING,
        type: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};