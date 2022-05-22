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
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      },
      have_enfermedades: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      enfermedades: {
        type: Sequelize.TEXT
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
      have_alergias: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      alergias: {
        type: Sequelize.TEXT
      },
      alergias_medicacion: {
        type: Sequelize.STRING
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