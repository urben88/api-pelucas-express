'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// //! Aqui se encuentra la configuración para la conexión a la base de datos
const config = require('./../../../config/database');
const sequelize_1 = require("sequelize");
//? Configuración por defecto
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const config = require('./../../../config/database');
const db = {};
//Creamos nuestra conexion
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
//Asociaciones y vinculaciones
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    const model = require(path.join(__dirname, file))(exports.sequelize, sequelize_1.Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = exports.sequelize;
db.Sequelize = sequelize_1.Sequelize;
module.exports = db;
