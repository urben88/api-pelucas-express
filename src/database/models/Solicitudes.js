'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitudes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Solicitudes.belongsTo(models.User,{foreignKey:"user_id"})
      Solicitudes.belongsTo(models.Cheques_regalo,{foreignKey:"cheques_regaloId",as:"cheque_regalo"})
      Solicitudes.belongsTo(models.Centros,{foreignKey:"centrosId"})
      //? Productos
      Solicitudes.hasOne(models.Protesis,{foreignKey:"solicitudId",as:"protesis"})
      Solicitudes.hasOne(models.Cabellos,{foreignKey:"solicitudId",as:"cabello"})
      Solicitudes.hasOne(models.Textiles,{foreignKey:"solicitudId",as:"textil"})
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