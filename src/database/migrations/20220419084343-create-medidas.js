'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medidas', {
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
      redondo: {
        type: Sequelize.FLOAT 
      },
      patilla_a_patilla: {
        type: Sequelize.FLOAT 
      },
      largo_de_frente: {
        type: Sequelize.FLOAT 
      },
      sien_a_sien: {
        type: Sequelize.FLOAT 
      },
      oreja_a_oreja_por_encima: {
        type: Sequelize.FLOAT 
      },
      anchura_del_cuello_superior: {
        type: Sequelize.FLOAT 
      },
      oreja_a_oreja_por_nacimiento_pelo: {
        type: Sequelize.FLOAT 
      },
      anchura_cuello_inferior: {
        type: Sequelize.FLOAT 
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
    await queryInterface.dropTable('medidas');
  }
};