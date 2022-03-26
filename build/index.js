"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//todo Importo las Rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const peliculasRoutes_1 = __importDefault(require("./routes/peliculasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //? Configuración del servidor
    config() {
        this.app.set('port', process.env.PORT || 3000);
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
        this.app.use("/peliculas", peliculasRoutes_1.default);
    }
    //? Ejecutar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`El server funciona en el puerto ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
