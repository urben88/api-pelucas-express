import Router from "express";

import { authController } from "../controllers/authController";

class AuthRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',authController.index)
        this.router.post('/singin',authController.signIn)
        this.router.post('/singup',authController.signUp)
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;