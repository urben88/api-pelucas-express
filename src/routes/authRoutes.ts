import Router from "express";

import { authController } from "../controllers/authController";
//todo Middleware para las rutas
import auth from '../middlewares/auth'
class AuthRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',authController.index)
        this.router.post('/singin',authController.signIn)
        this.router.post('/singup',authController.signUp)
        this.router.get('/user',auth,authController.getUser)
        this.router.get('/refresh',authController.refreshToken),
        this.router.put('/update',auth,authController.update)
        this.router.get('/isAdmin',auth,authController.isAdmin)
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;