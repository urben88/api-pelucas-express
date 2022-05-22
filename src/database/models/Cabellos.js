'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cabellos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cabellos.belongsTo(models.Solicitudes,{as:"solicitud",foreignKey:"solicitudId",})
    }
  }
  Cabellos.init({
    forma: DataTypes.STRING,
    color: DataTypes.STRING,
    longitud: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cabellos',
    tableName: 'cabellos',
  });
  return Cabellos;
};