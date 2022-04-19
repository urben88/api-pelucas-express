import { Request, Response} from 'express';
import { UserI } from '../interfaces/User';
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const {Datos_clinicos,User} = require('../database/models');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class Datos_ClinicosController{

    public index(req:Request,res:Response){
        res.json({
            text:"Estas en datos clinicos",
            // name: pkg.name,
            // author: pkg.author,
            // description: pkg.description,
            // version: pkg.version,
        });
    }
    async datosActual(req:Request,res:Response){
        let user:any = req.user;
        Datos_clinicos.findOne({where:{user_id:user.id}})
        .then((datos_clinicos:UserI)=>{
            if(datos_clinicos == null){
                res.status(404).json({msg:"No tiene datos clínicos registrados"})
            }else{
                res.status(200).json(datos_clinicos);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        })
    
    }

}
export const datos_clinicosController = new Datos_ClinicosController();