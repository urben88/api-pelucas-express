"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//? Estos son middlewares para express
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require('dotenv').config();
//? Conexion data base
//Esto nos sirve para conectarnos a la base de datos con sequelize
const models_1 = require("./database/models");
//todo Importo las Rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
// import peliculasRoutes from './routes/peliculasRoutes'
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// import userRoutes from './routes/userRoutes';
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //? Configuración del servidor
    config() {
        this.app.set('port', process.env.NODE_DOCKER_PORT || 3000);
        //Sirve para ver mensajes en consola de las peticiones
        this.app.use((0, morgan_1.default)('dev'));
        //Sirve para comunicar el frontend con el backend
        this.app.use((0, cors_1.default)());
        //Sirve para que el servidor puede leer objetos json en las peticiones
        this.app.use(express_1.default.json());
        //Sirve para enviar desde un formulario html
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //?Las rutas del servidor
    routes() {
        //?Le meto las rutas del index
        this.app.use(indexRoutes_1.default);
        // this.app.use("/api/peliculas",peliculasRoutes);
        this.app.use("/api/auth", authRoutes_1.default);
        // this.app.use('/api/user',userRoutes)
    }
    //? Ejecutar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`El server funciona en el puerto ${this.app.get('port')}`);
            //* Despues de ejecutar el servidor hago la conexión a la base de datos
            this.conexiondb();
        });
    }
    //? Uso el sequeleze del arhcivo de models/indes.js para hacer la conexión  a la base de datos
    conexiondb() {
        models_1.sequelize.authenticate().then(() => {
            console.log('Nos conectamos a la db!!');
        });
    }
}
const server = new Server();
server.start();
