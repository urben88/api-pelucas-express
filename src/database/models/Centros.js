'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Centros.init({
    provincia: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    nombre: DataTypes.STRING,
    info: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Centros',
    tableName: 'centros'
  });
  return Centros;
};