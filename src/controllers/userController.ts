import { count } from "console";
import { Request, Response  } from "express";
import { send } from "process";

//?Modelos
const {User,Role} = require('../database/models');

//?Interfaces
import { UserI } from "../interfaces/User";
import { Error } from "../interfaces/error";
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class UserController{

    public async index(req:Request,res:Response) {
        await User.findAll({include:["posts","roles"]}).then((users:UserI[]) =>{
            if(users.length != 0){
                res.status(200).json(users)
            }else{
                res.status(404).json({msg: "No hay usuarios"})
            }
        }).catch( (error:Error)=>{
            res.status(500).json(error)
        })
    }

    async showOne(req:Request,res:Response){
        await User.findOne({where:{id:req.params.id},include:"rol"})
        .then((user:any)=>{
            if(user == null){
                res.status(404).json({msg: "No existe el ususario con ese id"})
            }else{
                res.status(200).json(user)
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
    async delete(req:Request,res:Response){
        let user = await User.destroy({where:{id:req.params.id},force: true})
        .then((resul:any)=>{
            if(resul == 0){
                res.status(404).json({msg:"No existe el usuario que buscas"})
            }else{
                res.status(200).json({msg:"Eliminado correctamente"})
            }
        }).catch((err:Error)=>{
            res.status(500).json(err)
        })
    }
}
export const userController = new UserController();