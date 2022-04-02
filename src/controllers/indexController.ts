import { Request, Response} from 'express';
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
class IndexController{

    public index(req:Request,res:Response){
        res.json({
            text:"El api esta en /api/",
            // name: pkg.name,
            // author: pkg.author,
            // description: pkg.description,
            // version: pkg.version,
        });
    }

}
export const indexController = new IndexController();