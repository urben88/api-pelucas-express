import keys from "../src/keys"
module.exports = {
  // Configuración db
    username: keys.database.user || "root",
    password: keys.database.password || null,
    database: keys.database.database || "database_development",
    host: keys.database.host || "127.0.0.1",
    dialect: "mysql",

  //Configurar seeders
  seederStorage:"sequelize",
  seederStorageTableName: "seeds",

  //Configuración de Migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations"
}
