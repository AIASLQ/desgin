'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Songbook extends Model {
        static associate(models) {}
    };


    Songbook.init({
        name: DataTypes.STRING,
        coverUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Songbook',
    });
    return Songbook;
};