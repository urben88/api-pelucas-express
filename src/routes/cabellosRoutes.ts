import Router from "express";
import { cabellosController } from "../controllers/cabellosController";

//todo Middleware para las rutas
import auth from '../middlewares/auth'

class CabellosRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',cabellosController.index)
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)

    }
}
const cabellosRoutes = new CabellosRoutes();
export default cabellosRoutes.router;