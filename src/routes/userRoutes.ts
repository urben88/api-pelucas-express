import {Router, Request, Response} from 'express'
import { userController } from '../controllers/userController';
import auth from '../middlewares/auth';

class UserRoutes{
    public router = Router()

    constructor(){
       this.config();
    }

    config():void{
        this.router.get('/',userController.index)
        this.router.get('/:id',userController.showOne)
        this.router.delete('/:id',userController.delete)
        this.router.post('/updateAdmin',userController.updateAdmin)
        this.router.get('/getStatusDatos/:id',userController.getStatusDatos)
    }
}
const userRoutes = new UserRoutes();
export default userRoutes.router;