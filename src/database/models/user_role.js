'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User_role.belongsTo(models.User)
        User_role.belongsTo(models.Role)
    }
  }
  User_role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // references:{
    //     //   model:"users",
    //     //   key:'id'
    //     // }
    //   },
    //   role_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // references:{
    //     //   model:"roles",
    //     //   key:'id'
    //     // }
    //   }
  }, {
    tableName:"user_role",
    sequelize,
    modelName: 'User_role',
  });
  return User_role;
};