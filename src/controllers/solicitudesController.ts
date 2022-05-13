import { Request, Response} from 'express';
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//? Importo el modelo user
const {user} = require('../database/models/user');

//? Configuración para el auth
import authConfig from '../../config/auth'

//? Importo la interfazes creadas por mi
import { Error } from '../interfaces/error';
import { UserI } from '../interfaces/User';

const {Solicitudes,Cabellos,Protesis,Cheques_regalo,Textiles} = require('../database/models/index');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class SolicitudesController{


    //? Index
      public index(req:Request,res:Response){
        res.json({
            text:"Estas en solicitudes",
        });
    }

    async findAll(req:Request,res:Response){
        Solicitudes.findAll({include:[
            {model:Cabellos,as:"cabello"},
            {model:Protesis,as:"protesis"},
            {model:Textiles,as:"textil"},
            {model:Cheques_regalo,as:"cheque_regalo"},
        ]})
        .then((solicitudes:any)=>{
            if(solicitudes == null){
                res.status(404).json({msg:"No exiten solicitudes"})
            }else{
                res.status(200).json(solicitudes);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findAllSimple(req:Request,res:Response){
        Solicitudes.findAll()
        .then((solicitudes:any)=>{
            if(solicitudes == null){
                res.status(404).json({msg:"No exiten solicitudes"})
            }else{
                res.status(200).json(solicitudes);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findOneByUser(req:Request,res:Response){
        Solicitudes.findOne(
            {
                where:{user_id:req.params.id},
                include:[
                    {model:Cabellos,as:"cabello"},
                    {model:Protesis,as:"protesis"},
                    {model:Textiles,as:"textil"},
                    {model:Cheques_regalo,as:"cheque_regalo"},
                ]
            
            })
        .then((solicitud:any)=>{
            if(solicitud == null){
                res.status(404).json({msg:"No tiene ninguna solicitud"})
            }else{
                res.status(200).json(solicitud);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findOne(req:Request,res:Response){
        Solicitudes.findOne(
        {
            where:{id:req.params.id},
            include:[
                {model:Cabellos,as:"cabello"},
                {model:Protesis,as:"protesis"},
                {model:Textiles,as:"textil"},
                {model:Cheques_regalo,as:"cheque_regalo"},
            ]
        
        })
        .then((solicitud:any)=>{
            if(solicitud == null){
                res.status(404).json({msg:"No existe la solicitud"})
            }else{
                res.status(200).json(solicitud);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }

    async userHave(req:Request,res:Response){
        Solicitudes.findOne(
            {where:{user_id:req.params.id}}
        )
        .then((solicitud:any)=>{
            if(solicitud == null){
                res.status(200).json({have:false})
            }else{
                res.status(200).json({have:true});
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }


 
    //Create
    async create(req:Request,res:Response){

        //?Para controlar que solo puede hacer una única solicitud
        Solicitudes.findOne({where:{user_id:req.body.user_id}})
        .then((solicitud:any)=>{
            if(solicitud){
                res.status(405).send({msg:"No puedes crear mas de una solicitud"})
            }else{
                Solicitudes.create(req.body,{include:['protesis','cabello','textil']})
                    .then((solicitud:any)=>{
                        res.status(200).send(solicitud)   
                    })
                    .catch((err:any)=>{
                        res.status(500).send(err)
                    })
            }
        })

    }


    //Update
    async update(req:Request,res:Response){
        Solicitudes.update(req.body, {
            where:{user_id:req.params.id},
            include:[
                {model:Cabellos,as:"cabello"},
                {model:Protesis,as:"protesis"},
                {model:Textiles,as:"textil"},
                {model:Cheques_regalo,as:"cheque_regalo"},
            ]
        })
        .then((cheque:any)=>{
            if(cheque){
                Solicitudes.findOne(
                    {
                        where:{user_id:req.params.id},
                        include:[
                            {model:Cabellos,as:"cabello"},
                            {model:Protesis,as:"protesis"},
                            {model:Textiles,as:"textil"},
                            {model:Cheques_regalo,as:"cheque_regalo"},
                        ]
                    
                    })
                .then((actualizado:any)=>{
                    if(actualizado){
                        res.status(200).send(actualizado)
                    }else{
                        res.status(404).send({msg:"No existe la solicitud para actualizar"}) 
                    }
                })
                .catch((err:any)=>{
                    res.status(500).json(err)
                })
            }else{
                res.status(404).send({msg:"No existe una solicitud para actualizar"})
            }

        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }

    //Delete
    async remove(req:Request,res:Response){
        Solicitudes.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe la solicitud que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
    
}
export const solicitudesController = new SolicitudesController();