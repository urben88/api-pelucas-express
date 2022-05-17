import Router from "express";

import { centrosController } from "../controllers/centrosController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'
class AuthRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',centrosController.index)
        this.router.get('/findBy/:attr/:value',centrosController.findBy)
        this.router.put('/update',auth,admin,centrosController.update)
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;