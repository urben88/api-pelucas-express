import { Request, Response} from 'express';

class IndexController{

    public index(req:Request,res:Response){
        res.json({text:"El api esta en /api/"});
    }

}
export const indexController = new IndexController();