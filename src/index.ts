import express ,{ Application } from "express"; 

//? Estos son middlewares para express
import cors from 'cors';
import morgan from 'morgan';

require('dotenv').config()

//? Conexion data base
//Esto nos sirve para conectarnos a la base de datos con sequelize
import {sequelize} from './database/models';

//todo Importo las Rutas
// import indexRoutes from './routes/indexRoutes';
// import peliculasRoutes from './routes/peliculasRoutes'
// import authRoutes from "./routes/authRoutes";
// import userRoutes from './routes/userRoutes';

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
        // this.app.use(indexRoutes);
        // this.app.use("/api/peliculas",peliculasRoutes);
        // this.app.use("/api/auth",authRoutes)
        // this.app.use('/api/user',userRoutes)
    }

    //? Ejecutar el servidor
    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`El server funciona en el puerto ${this.app.get('port')}`)
            //* Despues de ejecutar el servidor hago la conexión a la base de datos
            this.conexiondb();
        })
    }
    //? Uso el sequeleze del arhcivo de models/indes.js para hacer la conexión  a la base de datos
    conexiondb(){
        sequelize.authenticate().then(()=>{
            console.log('Nos conectamos a la db!!')
        })
    }

}
const server = new Server();
server.start();

