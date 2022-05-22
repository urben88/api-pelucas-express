import { Request, Response} from 'express';
import { Notificacion } from '../interfaces/Notificacion';
import { UserI } from '../interfaces/User';
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const {Medidas,User,Notificaciones} = require('../database/models');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class NotificacionesController{

    public index(req:Request,res:Response){
        res.json({
            text:"Estas en notificaciones",
        });
    }
    async actual(req:Request,res:Response){
        let user:any = req.user;
        Notificaciones.findAll({where:{user_id:user.id}})
        .then((notificaciones:UserI)=>{
            if(notificaciones == null){
                res.status(404).json({msg:"No tiene notificaciones"})
            }else{
                res.status(200).json(notificaciones);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async isFromActualUser(req:Request,res:Response){
        let user:any = req.user;
        Notificaciones.findOne({where:{user_id:user.id,id:req.params.id}})
        .then((notificacion:Notificacion)=>{
            if(notificacion == null){
                res.status(404).json({msg:"No exite la notificacion"})
            }else{
                res.status(200).json(notificacion);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }

    async findUserNotificaciones(req:Request,res:Response){
        let id = req.params.id
        Notificaciones.findAll({where:{user_id:id}})
        .then((notificaciones:UserI)=>{
            if(notificaciones == null){
                res.status(404).json({msg:"No tiene notificaciones"})
            }else{
                res.status(200).json(notificaciones);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findUserNotificacionesNoLeidas(req:Request,res:Response){
        let id = req.params.id
        Notificaciones.findAll({where:{user_id:id,leido:false}})
        .then((notificaciones:UserI)=>{
            if(notificaciones == null){
                res.status(404).json({msg:"No tiene notificaciones"})
            }else{
                res.status(200).json(notificaciones);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }

    async delete(req:Request,res:Response){
        Notificaciones.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe la notificación que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
    async create(req:Request,res:Response){

        Notificaciones.create(req.body)
        .then((resul:any)=>{
            Notificaciones.findOne({where:{id:resul.id}})
            .then((noti:any)=>{
                res.status(200).json(noti)
            })
            .catch((err:any)=>{
                res.status(500).json(err)
            })
        })
        .catch((err:Error)=>{
            res.status(500).json(err)
        })

        
    }
    async showOne(req:Request,res:Response){
        Notificaciones.findOne({where:{id:req.params.id}})
        .then((resul:any)=>{
            if(resul == null){
                res.status(404).json({msg:"No se ha encontrado ninguna notificación con esa id"})
            }else{
                res.status(200).json(resul)
            }
        })
        .catch((err:Error)=>{
            res.status(500).json(err)
        })
    }

    async update(req:Request,res:Response){
        
        Notificaciones.update(req.body,{where:{id:req.params.id}})
        .then((resul:any)=>{
            if(resul == null){
                res.status(404).json({msg:"No se ha encontrado ninguna notificación con esa id"})
            }else{
                Notificaciones.findOne({where:{id:req.params.id}})
                .then((noti:Notificacion)=>{
                    res.status(200).json(noti)
                })
                .catch((err:Error)=>{
                    res.status(500).json(err)
                })
            }
        })
        .catch((err:Error)=>{
            res.status(500).json(err)
        })

    }
    async putLeido(req:Request,res:Response){
        Notificaciones.update({leido:true},{where:{id:req.params.id}})
        .then((resul:any)=>{
            if(resul == null){
                res.status(404).json({msg:"No se ha encontrado ninguna notificación con esa id"})
            }else{
                Notificaciones.findOne({where:{id:req.params.id}})
                .then((noti:Notificacion)=>{
                    res.status(200).json(noti)
                })
                .catch((err:Error)=>{
                    res.status(500).json(err)
                })
            }
        })
        .catch((err:Error)=>{
            res.status(500).json(err)
        })

    }

}
export const notificacionesController = new NotificacionesController();