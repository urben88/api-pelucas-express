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
        enfermedades:true,
        tratamiento_actual:"Limpiarse el cuero cabelludo",
        medicacion: null,
        otros: null,
        alergias:true,
        alergias_medicacion:"Paracetamol",
        alergias_cosmeticos:null,
        alergias_tipos:"metales,factores ambiaentales",
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
