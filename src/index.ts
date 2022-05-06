import express ,{ Application } from "express";

//? Estos son middlewares para express
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//?Importo las asociaciones
// require('./database/asociations');

require('dotenv').config()

//? Conexion data base
//Esto nos sirve para conectarnos a la base de datos con sequelize
const {sequelize} = require('./database/models');

//todo Middleware para las rutas
import auth from './middlewares/auth'

//todo Importo las Rutas
   import indexRoutes from './routes/indexRoutes';
   import authRoutes from "./routes/authRoutes";
   import postRoutes from "./routes/postRoutes";
   import userRoutes from './routes/userRoutes';
   import datos_clinicosRoutes from './routes/datos_clinicosRoutes';
   import medidasRoutes from './routes/medidasRoutes';
   import notificacionesRoutes from './routes/notificacionesRoutes';
   import centrosRoutes from './routes/centrosRoutes';
   import cheques_regalosRoutes from './routes/cheques_regaloRoutes';

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
        this.app.use(express.json({limit: '50mb'}));
        //Sirve para enviar desde un formulario html
        this.app.use(express.urlencoded({limit: '50mb',extended:true}))
        //El limit esto me ayuda a controlar el peso del body (Para subir imagenes).
        
        // this.app.use(bodyParser.json({limit:'100mb'}))

    }

    //?Las rutas del servidor
    routes():void{
        //?Le meto las rutas del index
        this.app.use(indexRoutes);
        this.app.use("/api/auth",authRoutes)
        this.app.use("/api/post",auth,postRoutes)
        this.app.use("/api/user",auth,userRoutes)
        this.app.use("/api/datos_clinicos",auth,datos_clinicosRoutes)
        this.app.use("/api/medidas",auth,medidasRoutes)
        this.app.use("/api/notificaciones",auth,notificacionesRoutes)
        this.app.use("/api/centros",centrosRoutes)
        this.app.use("/api/cheques_regalo",cheques_regalosRoutes)
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
    async conexiondb(){
        sequelize.authenticate().then(()=>{
            console.log('Nos conectamos a la db!!')
        })
        //? Sincronizo los modelos con la base de datos
        // await sequelize.sync({force:false})
    }

}
const server = new Server();
server.start();

