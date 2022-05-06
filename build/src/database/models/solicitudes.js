'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Solicitudes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Solicitudes.belongsTo(models.User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "userId" });
            Solicitudes.belongsTo(models.Cheques_regalo, { foreignKey: "cheques_regaloId" });
            Solicitudes.belongsTo(models.Centros, { foreignKey: "centrosId" });
            //? Productos
            Solicitudes.belongsTo(models.Protesis, { foreignKey: "protesisId" });
            Solicitudes.belongsTo(models.Cabellos, { foreignKey: "cabellosId" });
            Solicitudes.belongsTo(models.Textiles, { foreignKey: "textilesId" });
        }
    }
    Solicitudes.init({
        aceptado: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Solicitudes',
        tableName: 'solicitudes'
    });
    return Solicitudes;
};
