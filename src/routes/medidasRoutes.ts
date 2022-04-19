import Router from "express";

import { medidasController } from "../controllers/medidasController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
class Datos_ClinicosRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',medidasController.index)
        this.router.get('/actual',medidasController.actual)
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
export default medidasRoutes.router;