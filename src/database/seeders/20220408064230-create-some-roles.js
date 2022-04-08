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
     queryInterface.bulkInsert('roles', [
      { role: "admin" },
      { role: "colaborador" },
      { role: "receptor" }
      ]);

     queryInterface.bulkInsert('user_role', [
      {user_id:1, role_id:1},
      {user_id:2, role_id:2},
      {user_id:3, role_id:3},
    ]);


  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('roles', null, {});
     await queryInterface.bulkDelete('user_role', null, {});
  }
};
