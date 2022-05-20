import Router from "express";

import { chequesRegaloController } from "../controllers/cheques_regaloController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'
class Cheques_regaloRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',chequesRegaloController.index)
        this.router.get('/findAll',chequesRegaloController.findAll)
        this.router.put('/:id',chequesRegaloController.update)
        this.router.delete('/:id',chequesRegaloController.remove)
        this.router.post('/create',chequesRegaloController.create)
        this.router.get('/findBy/:attr/:value',chequesRegaloController.findBy)

    }
}
const cheques_regaloRoutes = new Cheques_regaloRoutes();
export default cheques_regaloRoutes.router;