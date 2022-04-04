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
const { user } = require("../models/index");
const bcrypt = require("bcryptjs");
const authConfig = require("../../../config/auth");
// const  { QueryInterface } = require("sequelize/types");
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                user.create({
                    nombre: "Ruben",
                    apellidos: "Esteve Vicente",
                    email: "urben88@gmail.com",
                    password: bcrypt.hashSync("123", +authConfig.rounds),
                    posts: [
                        {
                            title: "Post Autogenerado2",
                            body: "body1"
                        },
                        {
                            title: "Post Autogenerado2",
                            body: "body2"
                        },
                    ]
                }, {
                    include: "Posts"
                })
            ]);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             */
            yield queryInterface.bulkDelete('user', null, {});
            yield queryInterface.bulkDelete('Posts', null, {});
        });
    }
};
