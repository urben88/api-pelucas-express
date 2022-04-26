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
            yield queryInterface.bulkInsert('centros', [
                //! Castellón
                {
                    provincia: 'Castellón',
                    ciudad: 'Villa-real',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA FRANCESC TÀRREGA",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=12002889"
                },
                //! Valencia
                {
                    provincia: 'Valencia',
                    ciudad: 'ALBORAIA',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA PATACONA",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46014893"
                },
                {
                    provincia: 'Valencia',
                    ciudad: 'ALDAIA',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA SALVADOR GADEA",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46016038"
                },
                {
                    provincia: 'Valencia',
                    ciudad: 'VALÈNCIA',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA EL CABANYAL",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46013050"
                },
                {
                    provincia: 'Valencia',
                    ciudad: 'LA POBLA DE VALLBONA',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA VEREDA",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46022543"
                },
                {
                    provincia: 'Valencia',
                    ciudad: 'ALBAIDA',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA JOSEP SEGRELLES",
                    info: "https://ceice.gva.es/es/web/centros-docentes/ficha-centro?codi=46000213"
                },
                //! Alicante
                {
                    provincia: 'Alicante',
                    ciudad: 'ALCOI',
                    nombre: "CENTRE INTEGRAT PÚBLIC DE FORMACIÓ PROFESSIONAL BATOI",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03012165"
                },
                {
                    provincia: 'Alicante',
                    ciudad: 'BENIDORM',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA BERNAT DE SARRIÀ",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03012724"
                },
                {
                    provincia: 'Alicante',
                    ciudad: 'ROJALES',
                    nombre: "INSTITUTO DE EDUCACIÓN SECUNDARIA LA ENCANTÁ",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03014851"
                },
                {
                    provincia: 'Alicante',
                    ciudad: 'VILLENA',
                    nombre: "INSTITUTO DE EDUCACIÓN SECUNDARIA LAS FUENTES",
                    info: "https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03014599"
                },
                {
                    provincia: 'Alicante',
                    ciudad: 'ELX',
                    nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA TORRETA",
                    info: "https://ceice.gva.es/es/web/centros-docentes/ficha-centro?codi=03009661"
                },
                {
                    provincia: 'Alicante',
                    ciudad: 'CREVILLENT',
                    nombre: "IES MACIÀ ABELA",
                    info: "https://portal.edu.gva.es/iesmaciaabela/centro/localizacion/"
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
            yield queryInterface.bulkDelete('centros', null, {});
        });
    }
};
