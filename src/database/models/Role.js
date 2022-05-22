'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User,{as:"users",through:"user_role",foreignKey:"role_id"})
      Role.hasMany(models.User_role,{as:"user_role_role",foreignKey:"role_id"})
    }
  }
  Role.init({
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {
    tableName:"roles",
    sequelize,
    modelName: 'Role',
  });
  return Role;
};