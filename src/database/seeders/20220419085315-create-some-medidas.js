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
    
     await queryInterface.bulkInsert('medidas', [
       {
        user_id:1,
        redondo:2.0,
        patilla_a_patilla:1.2,
        largo_de_frente:99,
        sien_a_sien: 20,
        oreja_a_oreja_por_encima:2.978,
        anchura_del_cuello_superior: 83.29,
        oreja_a_oreja_por_nacimiento_pelo: 293.9,
        anchura_cuello_inferior: 283.2,
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('medidas', null, {});
  }
};
