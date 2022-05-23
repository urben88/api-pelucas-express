import jwt from "jsonwebtoken";
import authConfig from "../../config/auth"
import { UserI } from "../interfaces/User";
const {User} = require('../database/models/index');

export default (req:any,res:any,next:any):any =>{
    console.log(req.headers)

    //?Comprobar si existe el token
    if(!req.headers.authorization){
        res.status(401).json({ msg:"Acceso no autorizado"})
    }else{
        //*Comprobar la validez del token
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token,authConfig.secret,(err:any, decoded:any) =>{

            if(err){
                res.status(500).json(err)
            }else{
               //*El decoded es el usuario del token (devuelve el objeto del usuario)
               User.findOne({
                where:{id:decoded.user.id},
                include: "rol"
              }).then((user:any)=>{
                  console.log(user.rol)
                  req.user = user
                  next();  
               }).catch((err:any)=>{
                 throw ("Error en el auth middleware")
               })   
              
            }

        })


       
    }
}