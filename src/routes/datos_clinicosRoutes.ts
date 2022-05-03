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
        this.router.get('/findUserDatosClinicos/:id',datos_clinicosController.findUserDatosClinicos)
        this.router.post('/create',datos_clinicosController.create)
        this.router.put('/:id',datos_clinicosController.update)
        this.router.delete('/:id',datos_clinicosController.remove)
    }
}
const datos_ClinicosRoutes = new Datos_ClinicosRoutes();
export default datos_ClinicosRoutes.router;