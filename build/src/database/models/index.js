'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// //! Aqui se encuentra la configuración para la conexión a la base de datos
const config = require('./../../../config/database');
const sequelize_1 = require("sequelize");
//? Configurando para luego realizar la conexión
exports.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
