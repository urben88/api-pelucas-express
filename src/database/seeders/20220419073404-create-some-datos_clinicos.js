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
     queryInterface.bulkInsert('datos_clinicos', [
      {
        user_id:1,
        have_enfermedades:true,
        enfermedades:"Tengo leucemia",
        tratamiento_actual:"Limpiarse el cuero cabelludo",
        medicacion: null,
        otros: null,
        have_alergias:true,
        alergias:"Tengo alergias a los gatos",
        alergias_medicacion:"Paracetamol",
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('datos_clinicos', null, {});
  }
};
