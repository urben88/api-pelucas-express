'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notificaciones.belongsTo(models.User,{as:"user",foreignKey:"user_id"})
    }
  }
  Notificaciones.init({
    tipo: DataTypes.STRING,
    header: DataTypes.STRING,
    leido: DataTypes.BOOLEAN,
    mensaje: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Notificaciones',
    tableName:"notificaciones"
  });
  return Notificaciones;
};