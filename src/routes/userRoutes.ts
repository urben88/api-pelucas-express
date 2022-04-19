import {Router, Request, Response} from 'express'
import { userController } from '../controllers/userController';

class UserRoutes{
    public router = Router()

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',userController.index)
        this.router.get('/:id',userController.showOne)
        this.router.delete('/:id',userController.delete)
    }
}
const userRoutes = new UserRoutes();
export default userRoutes.router;