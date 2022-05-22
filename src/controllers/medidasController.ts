import { Request, Response} from 'express';
import { MedidasI } from '../interfaces/Medidas';
import { UserI } from '../interfaces/User';
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const {Medidas,User} = require('../database/models');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso 406 Not Acceptable
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
    async actualHave(req:Request,res:Response){
        let user:any = req.user;
        Medidas.findOne({where:{user_id:user.id}})
        .then((medidas:UserI)=>{
            if(medidas == null){
                res.status(200).json(false)
            }else{
                res.status(200).json(true);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findUserMedidas(req:Request,res:Response){
        Medidas.findOne({where:{user_id:req.params.id}})
        .then((medidas:MedidasI)=>{
            if(medidas == null){
                res.status(404).json({msg:"No tiene medidas registradas"})
            }else{
                res.status(200).json(medidas);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async create(req:Request,res:Response){
        Medidas.findOne({where:{user_id:req.body.user_id}})
        .then((encontrada:any)=>{
            if(encontrada){
                res.status(406).send({msg:"Ya existe una medida registrada de este usuario"})
            }else{
                Medidas.create(req.body)
                .then((medida:any)=>{
                    res.status(200).send(medida)
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
        Medidas.update(req.body,{where:{user_id:req.params.id}})
        .then((medida:any)=>{
            if(medida){
                Medidas.findOne({where:{user_id:req.params.id}})
                .then((actualizado:any)=>{
                    if(actualizado){
                        res.status(200).send(actualizado)
                    }else{
                        res.status(404).send({msg:"No tiene medidas para actualizar"}) 
                    }
                })
                .catch((err:any)=>{
                    res.status(500).json(err)
                })
            }else{
                res.status(404).send({msg:"No tiene medidas para actualizar"})
            }

        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async remove(req:Request,res:Response){
        Medidas.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe la medida que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
}
export const medidasController = new MedidasController();