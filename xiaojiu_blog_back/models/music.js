'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Music extends Model {
        static associate(models) {}
    };
    Music.init({
        name: DataTypes.STRING,
        singerId: DataTypes.BIGINT,
        count: DataTypes.BIGINT,
        typeId: DataTypes.BIGINT,
        desc: DataTypes.STRING,
        coverImg: DataTypes.STRING,
        singerName: DataTypes.STRING,
        typeName: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Music',
    });
    return Music;
};