import jwt from "jsonwebtoken";
import authConfig from "../../config/auth"
import { UserI } from "../interfaces/User";
const {User} = require('../database/models/index');

export default (req:any,res:any,next:any):any =>{
    console.log(req.headers)

    //?Comprobar si existe el token
    if(!User.isAdmin(req.user.rol)){
        res.status(401).json({ msg:"Solo puedes acceder si eres admin"})
    }else{
        next();                 
    }
}