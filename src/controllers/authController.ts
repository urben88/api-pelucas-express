import { Request, Response} from 'express';
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//? Importo el modelo user
const {user} = require('../database/models'); //! Mirar si le puedo poner un type al ORM
//? Configuración para el auth
import authConfig from '../../config/auth'

//? Importo la interfazes creadas por mi
import { Error } from '../interfaces/error';
import { User } from '../interfaces/User';
//Todo Tipos de status a usar
    //? 200 OK 201 Se ha creado
    //? 404 No se encontro 401 No tienes acceso
    //? 500 Error del servidor
class AuthController{
    //? Main
    index(req:Request,res:Response){
        res.json({
            text:'Estas en la creación de tokens'
        })
    }

    //?Login
    async signIn(req:Request,res:Response){
        let { email, password } = req.body;
        await user.findOne({
            where: {
                email: email
            }
        }).then((user:User) =>{
            if(!user){
                res.status(404).json({msg: "Usuario no encontrado"})
            }else{
                if(bcrypt.compareSync(password,user.password)){
                    //Devolvemos token
                    //? Creamos el token
                    let token = jwt.sign({user:user},authConfig.secret,{
                        expiresIn : authConfig.expires
                    })
                    res.json({
                        user: user,
                        token: token
                    })
                }else{
                    // Unauthorized Access
                    res.status(401).json({ msg:"Contraseña incorrecta"})
                }
            }
        }).catch( (error:Error)=>{
            res.status(500).json(error)
        })

    }

    //?Registro
    public async signUp(req:Request,res:Response){
        //? Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, +authConfig.rounds) //? El mas lo tranforma en número
        
        //*Crear un usuario
        await user.create({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: password
        })
        .then( (user:User) =>{
            //? Creamos el token
            let token = jwt.sign({user:user},authConfig.secret,{
                expiresIn : authConfig.expires
            })
            res.json({
                user:user,
                token:token
            });
        }).catch( (error:Error) =>{
            res.status(500).json(error)
        })

    }

}
export const authController = new AuthController();