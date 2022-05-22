'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('user_role', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"users",
          key:'id'
        },
        onDelete:"CASCADE",
        onUpdate: "CASCADE"
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"roles",
          key:'id'
        },
        //?Con esto evito que cuando se borre un usuario se borre tambien el rol en la tabal role
        onDelete:"NO ACTION",
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

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('user_role');
   
  }
};
