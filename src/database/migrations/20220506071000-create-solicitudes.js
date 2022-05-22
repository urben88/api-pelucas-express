'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aceptado: {
        type: Sequelize.BOOLEAN
      },
      disponibilidad: {
        type: Sequelize.STRING
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key:"id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      },
      centrosId:{
        type: Sequelize.INTEGER,
        references: {
          model: "centros",
          key:"id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      },
      cheques_regaloId:{
        type: Sequelize.INTEGER,
        references: {
          model: "cheques_regalo",
          key:"id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable('solicitudes');
  }
};