'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('notificaciones', [
       {
        user_id:1,
        tipo:"success",
        mensaje:"Ya esta tu peluca"
       },
       {
        user_id:1,
        tipo:"info",
        mensaje:"Ya esta tu peluca"
       },
       {
        user_id:1,
        tipo:"warn",
        mensaje:"Ya esta tu peluca"
       },
       {
        user_id:2,
        tipo:"success",
        mensaje:"Ya tienes la peluca lista"
       },
       {
        user_id:3,
        tipo:"warn",
        mensaje:"Error al enviar la peluca"
       },
       {
        user_id:2,
        tipo:"warn",
        mensaje:"Se ha cancelado tu petición de servicio"
       },
       
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('notificaciones', null, {});
  }
};
