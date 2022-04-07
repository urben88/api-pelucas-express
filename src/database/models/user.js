'use strict';
// import {DataTypes, Model } from 'sequelize';
// import { sequelize } from '.';
const {
  Model
} = require('sequelize');
module.exports =  (sequelize, DataTypes) => { 
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       user.hasMany(models.post,{as:"posts"}) //{ as:"posts", foreignKey:"userEmail"}
    }
  }
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          args:true,
          msg:"El correo electronico no está bien escrito"
        },
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("NOW"),
    }
  }, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'user',
});
return user;
};
