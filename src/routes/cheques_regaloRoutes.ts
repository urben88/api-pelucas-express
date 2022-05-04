import Router from "express";

import { chequesRegaloController } from "../controllers/cheques_regaloController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
class Cheques_regaloRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',chequesRegaloController.index)
        this.router.get('/findAll',chequesRegaloController.findAll)

    }
}
const cheques_regaloRoutes = new Cheques_regaloRoutes();
export default cheques_regaloRoutes.router;