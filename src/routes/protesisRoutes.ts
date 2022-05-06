import Router from "express";
import { protesisController } from "../controllers/protesisController";

//todo Middleware para las rutas
import auth from '../middlewares/auth'

class ProtesisRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',protesisController.index)
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)

    }
}
const protesisRoutes = new ProtesisRoutes();
export default protesisRoutes.router;