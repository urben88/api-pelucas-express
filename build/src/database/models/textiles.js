'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Textiles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Textiles.belongsTo(models.Solicitudes, { foreignKey: "solicitudId" });
        }
    }
    Textiles.init({
        color: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Textiles',
        tableName: 'textiles'
    });
    return Textiles;
};
