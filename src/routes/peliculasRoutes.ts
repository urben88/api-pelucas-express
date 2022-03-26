import Router from "express";


class PeliculasRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', (req,res)=>{
            res.send('Estas en peliculas');
        })
    }
}
const peliculasRoutes = new PeliculasRoutes();
export default peliculasRoutes.router;