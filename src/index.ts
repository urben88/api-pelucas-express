import express ,{ Application } from "express"; 

import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config()

//todo Importo las Rutas
import indexRoutes from './routes/indexRoutes';
import peliculasRoutes from './routes/peliculasRoutes'

class Server{
    //Variables
    public app:Application;

    constructor(){
        this.app= express();
        this.config();
        this.routes();
    }

    //? Configuración del servidor
    config():void{
        this.app.set('port',process.env.NODE_DOCKER_PORT || 3000)
        //Sirve para ver mensajes en consola de las peticiones
        this.app.use(morgan('dev'));
        //Sirve para comunicar el frontend con el backend
        this.app.use(cors());
        //Sirve para que el servidor puede leer objetos json en las peticiones
        this.app.use(express.json());
        //Sirve para enviar desde un formulario html
        this.app.use(express.urlencoded({extended:false}))
    }

    //?Las rutas del servidor
    routes():void{
        //?Le meto las rutas del index
        this.app.use(indexRoutes);
        this.app.use("/api/peliculas",peliculasRoutes);
    }

    //? Ejecutar el servidor
    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`El server funciona en el puerto ${this.app.get('port')}`)
        })
    }

}
const server = new Server();
server.start();
