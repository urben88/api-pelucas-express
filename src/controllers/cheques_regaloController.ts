import { Request, Response} from 'express';
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//? Importo el modelo user
const {user} = require('../database/models/user'); //! Mirar si le puedo poner un type al ORM

//? Configuración para el auth
import authConfig from '../../config/auth'

//? Importo la interfazes creadas por mi
import { Error } from '../interfaces/error';
import { UserI } from '../interfaces/User';

const {Post,Cheques_regalo} = require('../database/models/index');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class ChequesRegaloController{


    //? Index
      public index(req:Request,res:Response){
        res.json({
            text:"Estas en cheques regalo",
        });
    }
    async findAll(req:Request,res:Response){
        Cheques_regalo.findAll()
        .then((cheques:any)=>{
            if(cheques == null){
                res.status(404).json({msg:"No exiten cheques"})
            }else{
                res.status(200).json(cheques);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    async findBy(req:Request,res:Response){
        let attr = req.params.attr;
        let value = req.params.value;
        let json:any= {};
        json[attr]=value;
        Cheques_regalo.findAll({where:json})
        .then((cheques:any)=>{
            if(cheques == null){
                res.status(404).json({msg:"No exiten cheques"})
            }else{
                res.status(200).json(cheques);
            }
        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }
    
 
    //Create
    async create(req:Request,res:Response){
        Cheques_regalo.create(req.body)
            .then((medida:any)=>{
                res.status(200).send(medida)   
            })
            .catch((err:any)=>{
                res.status(500).send(err)
            })
    }


    //Update
    async update(req:Request,res:Response){
        Cheques_regalo.update(req.body,{where:{id:req.params.id}})
        .then((cheque:any)=>{
            if(cheque){
                Cheques_regalo.findOne({where:{id:req.params.id}})
                .then((actualizado:any)=>{
                    if(actualizado){
                        res.status(200).send(actualizado)
                    }else{
                        res.status(404).send({msg:"No existe el cheque regalo para actualizar"}) 
                    }
                })
                .catch((err:any)=>{
                    res.status(500).json(err)
                })
            }else{
                res.status(404).send({msg:"No existe el cheque regalo para actualizar"})
            }

        }).catch((err:any)=>{
            res.status(500).json(err)
        }) 
    }

    //Delete
    async remove(req:Request,res:Response){
        Cheques_regalo.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe el cheque regalo que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
    
}
export const chequesRegaloController = new ChequesRegaloController();