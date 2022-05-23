'use strict';
const bcrypt =  require('bcryptjs');
const authConfig = require('../../../config/auth.js')
const {User} = require('../models/index')

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
     await User.bulkCreate([
       {
        nombre:"ruben",
        apellidos:"Esteve vicente",
        email:"admin@gmail.com",
        password: bcrypt.hashSync("12345",authConfig.rounds),
        telefono:"123456789",
        cpostal:"12345",
        posts:[
          {
            title: "Title 1",
            body:"Body 2"
          }
        ]
       },
       {
        nombre:"alberto",
        apellidos:"Garcia Herrero",
        email:"alberto@gmail.com",
        password: bcrypt.hashSync("12345",authConfig.rounds),
        telefono:"123456789",
        cpostal:"12345",
        posts:[
          {
            title: "Title 2",
            body:"Body 3"
          },
          {
            title: "Title 2",
            body:"Body 3"
          },
          {
            title: "Title 2",
            body:"Body 3"
          }
        ]
       },
       {
        nombre:"rodrigo",
        apellidos:"Llork Puni",
        email:"rodrigo@gmail.com",
        password: bcrypt.hashSync("12345",authConfig.rounds),
        telefono:"123456789",
        cpostal:"12345",
       }
      ],{include:"posts"});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('User', null, {});
     await queryInterface.bulkDelete('Post', null, {});
  }
};
