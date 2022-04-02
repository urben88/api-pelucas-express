import { Request, Response  } from "express";
import pool from '../database/database'
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro
    //? 500 Error del servidor  
class UserController{

    public async index(req:Request,res:Response) {
        res.send('Funciona el user route')
    }
}
export const userController = new UserController();