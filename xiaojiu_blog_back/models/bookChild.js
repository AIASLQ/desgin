'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookChild extends Model {
        static associate(models) {}
    };
    BookChild.init({
        songBookId: DataTypes.BIGINT,
        musicId: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'BookChild',
    });
    return BookChild;
};