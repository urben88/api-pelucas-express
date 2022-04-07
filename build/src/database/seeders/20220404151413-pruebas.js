'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcryptjs');
const authConfig = require('../../../config/auth.js');
const { user } = require('../models/index');
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
            */
            yield user.bulkCreate([
                {
                    nombre: "ruben",
                    apellidos: "Esteve vicente",
                    email: "hudid@gmail.com",
                    password: bcrypt.hashSync("123", authConfig.rounds),
                    posts: [
                        {
                            title: "Title 1",
                            body: "Body 2"
                        }
                    ]
                },
                {
                    nombre: "alberto",
                    apellidos: "Garcia Herrero",
                    email: "alberto@gmail.com",
                    password: bcrypt.hashSync("123", authConfig.rounds)
                },
                {
                    nombre: "rodrigo",
                    apellidos: "Llork Puni",
                    email: "rodrigo@gmail.com",
                    password: bcrypt.hashSync("123", authConfig.rounds)
                }
            ], { include: "posts" });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
            yield queryInterface.bulkDelete('user', null, {});
            yield queryInterface.bulkDelete('post', null, {});
        });
    }
};