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
        email:"hudid@gmail.com",
        password: bcrypt.hashSync("123",authConfig.rounds),
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
        password: bcrypt.hashSync("123",authConfig.rounds)
       },
       {
        nombre:"rodrigo",
        apellidos:"Llork Puni",
        email:"rodrigo@gmail.com",
        password: bcrypt.hashSync("123",authConfig.rounds)
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
