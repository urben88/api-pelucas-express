"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("../src/keys"));
module.exports = {
    // Configuración db
    username: keys_1.default.database.user || "root",
    password: keys_1.default.database.password || null,
    database: keys_1.default.database.database || "database_development",
    host: keys_1.default.database.host || "127.0.0.1",
    dialect: "mysql",
    //Configurar seeders
    seederStorage: "sequelize",
    seederStorageTableName: "seeds",
    seedersTimestamps: true,
    //Configuración de Migraciones
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
    migrationTimestamps: true,
    //Para que los modelos tengan los mismos nombre que las tablas
    freezeTableName: true
};
