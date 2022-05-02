'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Datos_clinicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Datos_clinicos.belongsTo(models.User,{as:"user",foreignKey:"user_id"})
    }
  }
  Datos_clinicos.init({
    have_enfermedades: DataTypes.BOOLEAN,
    enfermedades:DataTypes.TEXT,
    tratamiento_actual: DataTypes.TEXT,
    medicacion: DataTypes.TEXT,
    otros: DataTypes.TEXT,
    have_alergias: DataTypes.BOOLEAN,
    alergias: DataTypes.TEXT,
    alergias_medicacion: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Datos_clinicos',
    tableName:'datos_clinicos'
  });
  return Datos_clinicos;
};