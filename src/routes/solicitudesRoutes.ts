import Router from "express";
import { solicitudesController } from "../controllers/solicitudesController";

//todo Middleware para las rutas
import auth from '../middlewares/auth'

class SolicitudesRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',solicitudesController.index)
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)

    }
}
const solicitudesRoutes = new SolicitudesRoutes();
export default solicitudesRoutes.router;