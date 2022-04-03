'use strict';
// //! Aqui se encuentra la configuración para la conexión a la base de datos
const config = require('./../../../config/database');
import {Sequelize} from "sequelize";

//? Configurando para luego realizar la conexión
export const sequelize = new Sequelize(config.database, config.username, config.password, config);




//? Configuración por defecto
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
//const config = require('./../../../config/database');
// const db = {};

// //Creamos nuestra conexion
// let sequelize = new Sequelize(config.database, config.username, config.password, config,{
  
// });

// //Asociaciones y vinculaciones
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;