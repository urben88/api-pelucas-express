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
const {Centros} = require('../database/models/index');
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class CentrosController{

    //? Index
    async index(req:Request,res:Response){
        await Centros.findAll()
        .then((centros:any)=>{
            if(centros){
               res.status(200).json(centros) 
            }else{
                res.status(404).json({msg:"No se ha encontrado ningun centro"})
            }
        })
        .catch((error:Error) =>{
            res.status(500).json(error)
        })
      
    }
    //? Find
    async findBy(req:Request,res:Response){
        let atributo = req.params.attr;
        let value = req.params.value;
        let json:any= {};
        json[atributo]=value;
        await Centros.findAll({'where':json})
        .then((centros:any)=>{
            if(centros){
               res.status(200).json(centros) 
            }else{
                res.status(404).json({msg:"No se ha encontrado ningun centro con "+atributo+" = "+value})
            }
        })
        .catch((error:Error) =>{
            res.status(500).json(error)
        })
      
    }

    //Show
    async show(req:Request|any, res:Response){
        try{
           res.json(req.post)
        }catch(error:any){
            res.status(500).json(error)
        }
       
    }
    async update(req:Request,res:Response){
        
        await Centros.update(req.body,{where:{id:req.body.id}})
        .then((centro:any)=>{
            if(centro == null){
                res.status(404).json({msg: "No existe centro con ese id"})
            }else{
                res.status(200).json(centro)
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
    //Delete
    async delete(req:Request|any,res:Response){
       try{
            req.post.destroy().then((post:any)=>{
                res.status(200).json({post,msg:"El post ha sido eliminado"})
            })
        }catch(error){
            res.status(500).json(error)
        }
    }
    
}
export const centrosController = new CentrosController();