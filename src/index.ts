import  express,{ Application } from "express"; 

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
        this.app.set('port',process.env.PORT || 3000)
    }

    //?Las rutas del servidor
    routes():void{
        //?Le meto las rutas del index
        this.app.use(indexRoutes);
        this.app.use("/peliculas",peliculasRoutes);
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
