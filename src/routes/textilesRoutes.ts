import Router from "express";
import { textilesController } from "../controllers/textilesController";

//todo Middleware para las rutas
import auth from '../middlewares/auth'

class TextilesRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',textilesController.index)
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)

    }
}
const textilesRoutes = new TextilesRoutes();
export default textilesRoutes.router;