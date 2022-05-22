import { Request, Response} from 'express';
import { DatosClinicosI } from '../interfaces/Datos_clinicos';
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
    async actualHave(req:Request,res:Response){
        let user:any = req.user;
        Datos_clinicos.findOne({where:{user_id:user.id}})
        .then((datos_clinicos:UserI)=>{
            if(datos_clinicos == null){
                res.status(200).json(false)
            }else{
                res.status(200).json(true);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        })
    
    }
    async findUserDatosClinicos(req:Request,res:Response){
        Datos_clinicos.findOne({where:{user_id:req.params.id}})
        .then((medidas:DatosClinicosI)=>{
            if(medidas == null){
                res.status(404).json({msg:"No tiene datos clínicos registrados"})
            }else{
                res.status(200).json(medidas);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async create(req:Request,res:Response){
        Datos_clinicos.findOne({where:{user_id:req.body.user_id}})
        .then((encontrada:any)=>{
            if(encontrada){
                res.status(406).send({msg:"Ya existen datos clínicos de este usuario"})
            }else{
                Datos_clinicos.create(req.body)
                .then((datosclinicos:any)=>{
                    res.status(200).send(datosclinicos)
                }).catch((err:any)=>{
                    res.status(500).json(err)
                }) 
            }
        })
        .catch((err:any)=>{
            res.status(500).send(err)
        })
     
    }
    async update(req:Request,res:Response){
        Datos_clinicos.update(req.body,{where:{user_id:req.params.id}})
        .then((datosclinicos:any)=>{
            if(datosclinicos){
                Datos_clinicos.findOne({where:{user_id:req.params.id}})
                .then((actualizado:any)=>{
                    if(actualizado){
                        res.status(200).send(actualizado)
                    }else{
                        res.status(404).send({msg:"No tiene datos clínicos para actualizar"}) 
                    }
                })
                .catch((err:any)=>{
                    res.status(500).json(err)
                })
            }else{
                res.status(404).send({msg:"No tiene datos clínicos para actualizar"})
            }

        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async remove(req:Request,res:Response){
        Datos_clinicos.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe los datos clínicos que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }

}
export const datos_clinicosController = new Datos_ClinicosController();