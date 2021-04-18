'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Singer extends Model {
        static associate(models) {}
    };
    Singer.init({
        name: DataTypes.STRING,
        sex: DataTypes.BIGINT,
        hot: DataTypes.BIGINT,
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Singer',
    });
    return Singer;
};