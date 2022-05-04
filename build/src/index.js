"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//? Estos son middlewares para express
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
//?Importo las asociaciones
// require('./database/asociations');
require('dotenv').config();
//? Conexion data base
//Esto nos sirve para conectarnos a la base de datos con sequelize
const { sequelize } = require('./database/models');
//todo Middleware para las rutas
const auth_1 = __importDefault(require("./middlewares/auth"));
//todo Importo las Rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const datos_clinicosRoutes_1 = __importDefault(require("./routes/datos_clinicosRoutes"));
const medidasRoutes_1 = __importDefault(require("./routes/medidasRoutes"));
const notificacionesRoutes_1 = __importDefault(require("./routes/notificacionesRoutes"));
const centrosRoutes_1 = __importDefault(require("./routes/centrosRoutes"));
const cheques_regaloRoutes_1 = __importDefault(require("./routes/cheques_regaloRoutes"));
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
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: false }));
        //Esto me ayuda a controlar el peso del body (Para subir imagenes).
        this.app.use(body_parser_1.default.json({ limit: '100mb' }));
    }
    //?Las rutas del servidor
    routes() {
        //?Le meto las rutas del index
        this.app.use(indexRoutes_1.default);
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/post", auth_1.default, postRoutes_1.default);
        this.app.use("/api/user", auth_1.default, userRoutes_1.default);
        this.app.use("/api/datos_clinicos", auth_1.default, datos_clinicosRoutes_1.default);
        this.app.use("/api/medidas", auth_1.default, medidasRoutes_1.default);
        this.app.use("/api/notificaciones", auth_1.default, notificacionesRoutes_1.default);
        this.app.use("/api/centros", centrosRoutes_1.default);
        this.app.use("/api/cheques_regalo", cheques_regaloRoutes_1.default);
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
        return __awaiter(this, void 0, void 0, function* () {
            sequelize.authenticate().then(() => {
                console.log('Nos conectamos a la db!!');
            });
            //? Sincronizo los modelos con la base de datos 
            // await sequelize.sync({force:false}) 
        });
    }
}
const server = new Server();
server.start();
