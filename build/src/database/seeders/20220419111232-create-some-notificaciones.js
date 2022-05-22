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
            yield queryInterface.bulkInsert('notificaciones', [
                {
                    user_id: 1,
                    tipo: "success",
                    header: "Ya esta tu peluca",
                    mensaje: "Ya esta tu peluca"
                },
                {
                    user_id: 1,
                    tipo: "info",
                    header: "Ya esta tu peluca",
                    mensaje: "Ya esta tu peluca"
                },
                {
                    user_id: 1,
                    tipo: "warn",
                    header: "Ya esta tu peluca",
                    mensaje: "Ya esta tu peluca"
                },
                {
                    user_id: 2,
                    tipo: "success",
                    header: "Ya esta tu peluca",
                    mensaje: "Ya tienes la peluca lista"
                },
                {
                    user_id: 3,
                    tipo: "warn",
                    header: "Ya esta tu peluca",
                    mensaje: "Error al enviar la peluca"
                },
                {
                    user_id: 2,
                    tipo: "warn",
                    header: "Ya esta tu peluca",
                    mensaje: "Se ha cancelado tu petición de servicio"
                },
            ], {});
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
            yield queryInterface.bulkDelete('notificaciones', null, {});
        });
    }
};
