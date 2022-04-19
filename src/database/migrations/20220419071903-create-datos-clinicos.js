'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('datos_clinicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"users",
          key:'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      enfermedades: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tratamiento_actual: {
        type: Sequelize.TEXT
      },
      medicacion: {
        type: Sequelize.TEXT
      },
      otros: {
        type: Sequelize.TEXT
      },
      alergias: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      alergias_medicacion: {
        type: Sequelize.STRING
      },
      alergias_cosmeticos: {
        type: Sequelize.STRING
      },
      alergias_tipos: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('datos_clinicos');
  }
};