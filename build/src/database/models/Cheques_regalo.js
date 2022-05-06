'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cheques_regalo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cheques_regalo.hasMany(models.User, { as: "user" });
        }
    }
    Cheques_regalo.init({
        servicio: DataTypes.STRING,
        descripcion: DataTypes.TEXT('long'),
        tipo: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Cheques_regalo',
        tableName: 'cheques_regalo',
    });
    return Cheques_regalo;
};
