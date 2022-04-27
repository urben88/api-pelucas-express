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
     await queryInterface.bulkInsert('centros', [
       //! Castellón
       {
         provincia: 'Castellón',
         ciudad: 'Villa-real',
         nombre:"INSTITUT D'EDUCACIÓ SECUNDÀRIA FRANCESC TÀRREGA",
         info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=12002889",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/12002889.jpg"
        },
       //! Valencia
       {
         provincia: 'Valencia',
         ciudad: 'ALBORAIA',
         nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA PATACONA",
         info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46014893",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/46014893.jpg"
        },
       {
         provincia: 'Valencia',
         ciudad: 'ALDAIA',
         nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA SALVADOR GADEA",
         info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46016038",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/46016038.jpg"
        },
       {
         provincia: 'Valencia',
         ciudad: 'VALÈNCIA',
         nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA EL CABANYAL",
         info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46013050",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/46013050.jpg"
        },
       {
         provincia: 'Valencia',
         ciudad: 'LA POBLA DE VALLBONA',
         nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA VEREDA",
         info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=46022543",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/46022543.jpg"
        },
       {
         provincia: 'Valencia',
         ciudad: 'ALBAIDA',
         nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA JOSEP SEGRELLES",
         info:"https://ceice.gva.es/es/web/centros-docentes/ficha-centro?codi=46000213",
         img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/46000213.jpg"
       },
       //! Alicante
       {
        provincia: 'Alicante',
        ciudad: 'ALCOI',
        nombre: "CENTRE INTEGRAT PÚBLIC DE FORMACIÓ PROFESSIONAL BATOI",
        info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03012165",
        img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/03012165.jpg"
      },
       {
        provincia: 'Alicante',
        ciudad: 'BENIDORM',
        nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA BERNAT DE SARRIÀ",
        info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03012724",
        img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/03012724.jpg"
      },
       {
        provincia: 'Alicante',
        ciudad: 'ROJALES',
        nombre: "INSTITUTO DE EDUCACIÓN SECUNDARIA LA ENCANTÁ",
        info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03014851",
        img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/03014851.jpg"
      },
       {
        provincia: 'Alicante',
        ciudad: 'VILLENA',
        nombre: "INSTITUTO DE EDUCACIÓN SECUNDARIA LAS FUENTES",
        info:"https://ceice.gva.es/abc/i_guiadecentros/es/centro.asp?codi=03014599",
        img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/03014599.jpg"
      },
       {
        provincia: 'Alicante',
        ciudad: 'ELX',
        nombre: "INSTITUT D'EDUCACIÓ SECUNDÀRIA LA TORRETA",
        info:"https://ceice.gva.es/es/web/centros-docentes/ficha-centro?codi=03009661",
        img:"https://ceice.gva.es/abc/i_guiadecentros/Fotos/03009661.jpg"
      },
       {
        provincia: 'Alicante',
        ciudad: 'CREVILLENT',
        nombre: "IES MACIÀ ABELA",
        info:"https://portal.edu.gva.es/iesmaciaabela/centro/localizacion/",
        img:"https://portal.edu.gva.es/iesmaciaabela/wp-content/uploads/sites/513/2021/02/03003978.jpg"
      },
      
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('centros', null, {});
  }
};
