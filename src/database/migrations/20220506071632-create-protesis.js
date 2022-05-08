'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('protesis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      forma: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      solicitudId:{
        type: Sequelize.INTEGER,
        references: {
          model: "solicitudes",
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
    await queryInterface.dropTable('protesis');
  }
};