import Router from "express";

import { datos_clinicosController } from "../controllers/datos_clinicosController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
class Datos_ClinicosRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',datos_clinicosController.index)
        this.router.get('/actual',datos_clinicosController.datosActual)
    }
}
const datos_ClinicosRoutes = new Datos_ClinicosRoutes();
export default datos_ClinicosRoutes.router;