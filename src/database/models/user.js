'use strict';
import {DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
export class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
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
      primaryKey: true,
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
    }
  }, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'user',
});