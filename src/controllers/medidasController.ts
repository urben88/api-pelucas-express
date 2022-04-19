import { Request, Response} from 'express';
import { UserI } from '../interfaces/User';
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const {Medidas,User} = require('../database/models');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class MedidasController{

    public index(req:Request,res:Response){
        res.json({
            text:"Estas en medidas",
        });
    }
    async actual(req:Request,res:Response){
        let user:any = req.user;
        Medidas.findOne({where:{user_id:user.id}})
        .then((medidas:UserI)=>{
            if(medidas == null){
                res.status(404).json({msg:"No tiene medidas registradas"})
            }else{
                res.status(200).json(medidas);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
}
export const medidasController = new MedidasController();