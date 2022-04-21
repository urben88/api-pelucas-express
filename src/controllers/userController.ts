import { count } from "console";
import { Request, Response  } from "express";
import { send } from "process";

//?Modelos
const {User,Role,User_role} = require('../database/models');

//?Interfaces
import { Rol, UserI } from "../interfaces/User";
import { Error } from "../interfaces/error";

//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class UserController{

    public async index(req:Request,res:Response) {
        await User.findAll({include:["rol"]}).then((users:UserI[]) =>{
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
    async updateAdmin(req:Request,res:Response){
        let roles:Rol[] = [];
        if(req.body.rolesBuscar){
            req.body.rolesBuscar.forEach(async(rol:string) => {
                await Role.findOne({where:{role:rol}})
                .then((rolfind:Rol)=>{
                    roles.push(rolfind)
                })
            });
        }else{
            throw "No se encuentra el atributo rolesBuscar"
        }
        delete req.body.rolesBuscar;
        req.body.rol = roles;
        
        await User.update(req.body,{where:{id:req.body.id},include:"rol"})
        .then((user:any)=>{
            if(user == null){
                res.status(404).json({msg: "No existe el ususario con ese id"})
            }else{
                //TODO FALTA SOLUCIONAR ESTO DE LOS ROLES (DEBO SOLO CREAR EN USER_ROLE EL ROL NUEVO Y NO EL QUE EXISTE)
                //!O no hace falta, hay que mirarlo
                // let rolesusu:Rol[];
                // User_role.findAll({where:{user_id:req.body.id}}).then(
                //     (roles:Rol[])=>{
                //         rolesusu = roles
                //     }).catch((err:any)=>{
                //         res.status(500).json(err)
                //     })
                //? Esto elimina los existentes y luego crea nuevos
                 User_role.destroy({where:{user_id:req.body.id}})
                   .catch((err:any)=>{
                        res.status(500).json(err)
                    })

                
                roles.forEach((rol:Rol)=>{     
                    User_role.create({user_id:req.body.id,role_id:rol.id}).catch((err:any)=>res.status(500).json(err))    
                })
                res.status(200).json({status:user,res:req.body.rol})
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