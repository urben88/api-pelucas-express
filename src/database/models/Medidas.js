'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medidas.belongsTo(models.User,{as:"user",foreignKey:"user_id"})

    }
  }
  Medidas.init({
    redondo: DataTypes.FLOAT ,
    patilla_a_patilla: DataTypes.FLOAT ,
    largo_de_frente: DataTypes.FLOAT ,
    sien_a_sien: DataTypes.FLOAT ,
    oreja_a_oreja_por_encima: DataTypes.FLOAT ,
    anchura_del_cuello_superiror: DataTypes.FLOAT ,
    oreja_a_oreja_por_nacimiento_pelo: DataTypes.FLOAT ,
    anchura_cuello_inferior: DataTypes.FLOAT 
  }, {
    sequelize,
    modelName: 'Medidas',
    tableName:'medidas'
  });
  return Medidas;
};