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
            yield queryInterface.bulkInsert('cheques_regalo', [
                //? Peluqueria
                {
                    servicio: "corte", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "color", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "hidratación", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "esmaltado", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "adaptación de la prótesis", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "adaptación de corte", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "adaptación de color", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "esmaltado", tipo: "peluquería", descripcion: "Esta es una descripción default"
                },
                //? Estética
                {
                    servicio: "higiene facial", tipo: "estética", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "higiene facial", tipo: "estética", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "TTO facial", tipo: "estética", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "TTO corporal", tipo: "estética", descripcion: "Esta es una descripción default"
                },
                {
                    servicio: "masaje", tipo: "estética", descripcion: "Esta es una descripción default"
                },
                //? Recogida
                {
                    servicio: "recogida", tipo: "recogida", descripcion: "Esta es una descripción default"
                },
            ]);
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
        });
    }
};
