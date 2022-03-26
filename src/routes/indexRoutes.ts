import Router from "express";


class IndexRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', (req,res)=>{
            res.send('Hello');
        })
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;