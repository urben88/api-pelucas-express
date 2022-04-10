import {Request,Response,NextFunction} from "express"

const {User} = require('../database/models/index')
//Todo Como este "Middleware" que hace de Guard lo pongo al final de las rutas el req ya contiente tanto el rol,el post... todos los que estan antes"
export default {

    //Para ver un post
    show(req:Request|any,res:Response,next:NextFunction){
        //? Saber si es el propietario del post
        if(req.user.id == req.post.userId || User.isAdmin(req.user.roles)){
            next()
        }else{
            res.status(401).json({msg:"No estas autorizado para ver esta publicación"})
        }
    },

    //Para eliminar un post
    delete(req:Request|any,res:Response,next:NextFunction){
        //? Saber si es el propietario del post
        if(req.user.id == req.post.userId || User.isAdmin(req.user.roles)){
            next()
        }else{
            res.status(401).json({msg:"No estas autorizado para ver esta publicación"})
        }
    },

    //Para actualizar un post
    update(req:Request|any,res:Response,next:NextFunction){
        //? Saber si es el propietario del post
        if(req.user.id == req.post.userId || User.isAdmin(req.user.roles)){
            next()
        }else{
            res.status(401).json({msg:"No estas autorizado para ver esta publicación"})
        }
    }
}