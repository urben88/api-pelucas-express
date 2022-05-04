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
   await queryInterface.bulkInsert('Cheques_regalo',[

     //? Peluqueria
     {
       servicio:"corte",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"color",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"hidratación",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"esmaltado",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"adaptación de la prótesis",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"adaptación de corte",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"adaptación de color",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"esmaltado",tipo:"peluquería",descripcion:"Esta es una descripción default"
     },

     //? Estética
     {
       servicio:"higiene facial",tipo:"estética",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"higiene facial",tipo:"estética",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"TTO facial",tipo:"estética",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"TTO corporal",tipo:"estética",descripcion:"Esta es una descripción default"
     },
     {
       servicio:"masaje",tipo:"estética",descripcion:"Esta es una descripción default"
     },

     //? Recogida
     {
       servicio:"recogida",tipo:"recogida",descripcion:"Esta es una descripción default"
     },

   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
