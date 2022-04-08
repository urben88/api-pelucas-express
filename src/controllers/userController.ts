import { count } from "console";
import { Request, Response  } from "express";
import { send } from "process";

//?Modelos
const {User} = require('../database/models');

//?Interfaces
import { UserI } from "../interfaces/User";
import { Error } from "../interfaces/error";
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class UserController{

    public async index(req:Request,res:Response) {
        await User.findAll({include:"posts"}).then((users:UserI[]) =>{
            if(users.length != 0){
                res.status(200).json(users)
            }else{
                res.status(404).json({msg: "No hay usuarios"})
            }
        }).catch( (error:Error)=>{
            res.status(500).json(error)
        })
    }
}
export const userController = new UserController();