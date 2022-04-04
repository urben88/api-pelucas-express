import Router from "express";

import {postController} from "../controllers/postController";

class AuthRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',postController.index)
    }
}
const authRoutes = new AuthRoutes();
export default authRoutes.router;