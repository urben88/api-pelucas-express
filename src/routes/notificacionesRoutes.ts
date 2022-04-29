import Router from "express";

import { notificacionesController } from "../controllers/notificacionesController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
class Datos_ClinicosRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',notificacionesController.index)
        this.router.get('/actual',notificacionesController.actual)
        this.router.get('/findByUserId/:id',notificacionesController.findUserNotificaciones)
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
export default medidasRoutes.router;