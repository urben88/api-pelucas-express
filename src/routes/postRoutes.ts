import Router from "express";

import {postController} from "../controllers/postController";

//!Guards
import PostGuard from "../guards/PostGuard"
//todo Middleware para las rutas
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'
class AuthRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',postController.index)
        this.router.get('/:id',postController.find,PostGuard.show,postController.show)
        this.router.put('/:id',postController.find,PostGuard.update,postController.update)
        this.router.delete('/:id',postController.find,PostGuard.delete,postController.delete)
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;