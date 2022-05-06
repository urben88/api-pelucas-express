'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Protesis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Protesis.init({
    forma: DataTypes.STRING,
    color: DataTypes.STRING,
    longitud: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Protesis',
    tableName:'protesis'
  });
  return Protesis;
};