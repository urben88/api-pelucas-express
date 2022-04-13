'use strict';
// import {DataTypes, Model } from 'sequelize';
// import { sequelize } from '.';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Post, { as: "posts", foreignKey: "userId" }); //{ as:"posts", foreignKey:"userEmail"}
            User.belongsToMany(models.Role, { as: "rol", through: "user_role", foreignKey: "user_id" });
            User.hasMany(models.User_role, { as: "user_role_user", foreignKey: "user_id" });
        }
    }
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "El correo electronico no está bien escrito"
                },
            }
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpostal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
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
        modelName: 'User',
        tableName: 'users'
    });
    // Comprueba que el usuario es administrador
    User.isAdmin = function (roles) {
        let tmpArray = [];
        roles.forEach(role => tmpArray.push(role.role));
        return tmpArray.includes('admin');
    };
    // Comprueba que el usuario es colaborador
    User.isColaborador = function (roles) {
        let tmpArray = [];
        roles.forEach(role => tmpArray.push(role.role));
        return tmpArray.includes('colaborador');
    };
    // Comprueba que el usuario es receptor
    User.isAdmin = function (roles) {
        let tmpArray = [];
        roles.forEach(role => tmpArray.push(role.role));
        return tmpArray.includes('receptor');
    };
    return User;
};
