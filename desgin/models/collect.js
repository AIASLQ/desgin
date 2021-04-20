'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Collect extends Model {
        static associate(models) {}
    };
    Collect.init({
        musicId: DataTypes.BIGINT,
        typeId: DataTypes.BIGINT,
        userId: DataTypes.BIGINT,
        coverImg: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Collect',
    });
    return Collect;
};