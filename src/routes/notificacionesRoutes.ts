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
        this.router.delete('/:id',notificacionesController.delete)
        this.router.post('/create',notificacionesController.create)
        this.router.get('/:id',notificacionesController.showOne)
        this.router.put('/:id',notificacionesController.update)
        this.router.get('/isFromActualUser/:id',notificacionesController.isFromActualUser)
        this.router.put('/putLeido/:id',notificacionesController.putLeido)
        this.router.get('/findUserNotificacionesNoLeidas/:id',notificacionesController.findUserNotificacionesNoLeidas)
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
export default medidasRoutes.router;