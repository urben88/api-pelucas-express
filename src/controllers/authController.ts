import { Request, Response} from 'express';
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//? Importo el modelo user
const {User} = require('../database/models'); //! Mirar si le puedo poner un type al ORM
const {Role} = require('../database/models');
const {User_role} = require('../database/models');
//? Configuración para el auth
import authConfig from '../../config/auth'

//? Importo la interfazes creadas por mi
import { Error } from '../interfaces/error';
import { UserI} from '../interfaces/User';
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
        await User.findOne({
            where: {
                email: email
            },
            include:'rol'
        }).then((User:UserI) =>{
            if(!User){
                res.status(404).json({msg: "Usuario no encontrado"})
            }else{
                if(bcrypt.compareSync(password,User.password)){
                    //Devolvemos token
                    //? Creamos el token
                    let token = jwt.sign({user:User},authConfig.secret,{
                        expiresIn : authConfig.expires
                    })
                    res.json({
                        user: User,
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
        let rol = await Role.findOne({ where:{ role: req.body.rol }})
        //*Crear un usuario
        await User.create({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: password,
            telefono: req.body.telefono,
            cpostal: req.body.cpostal,
        })
        .then( (User:any) =>{
            // console.log('User',User.id)
            // console.log('rol',rol)
            //? Creamos el token
            let token = jwt.sign({user:User},authConfig.secret,{
                expiresIn : authConfig.expires
            })
            User_role.create({
                user_id: User.dataValues.id,
                role_id: rol.id
            }).then( (User_Role:any)=>{
                res.json({
                    user:User,
                    token:token,
                });  
            }).catch((error:Error)=>{
                res.status(500).json({error,msg:"Error en rol"})
            })
          
        }).catch( (error:Error) =>{
            res.status(500).json({error,msg:"Error en user"})
        })
    }

    //TODO Falta hacer el update
    public async update(req:Request,res:Response){
        let passwordencript!:any;
        if(req.body.password){
            passwordencript = bcrypt.hashSync(req.body.password, +authConfig.rounds) //? El mas lo tranforma en número
        }
        // let user:UserI;
        console.log(req.body)
        //? Decodifico el jwt
        jwt.verify(req.headers.authorization?.split(' ')[1] as string,authConfig.secret,
            (err,decoded:any)=>{
                //? Actualizo el usuario
                let resul = req.body;
                if(req.body.password){
                    resul.password = passwordencript;
                }
                // console.log(resul)
                // console.log(decoded.user)
                User.update(resul,{where:{id:decoded.user.id}})
                .then((newUser:UserI)=>{
                        res.status(200).json({msg:"Se ha actualizado con éxito"})
                    }).catch((err:Error)=>{
                        console.log(err)
                        res.status(500).json(err)
                    })
            }
        )
    }

    public async refreshToken(req:Request,res:Response){
        let refreshToken = req.headers.authorization?.split(' ')[1] as string;

        //?Si no existe el token
        if(!refreshToken){
            res.status(400).json({msg:"Algo ha ido mal en el refresh del token"})       
        }
        let userfind;
        try{
            const verifyResult:any = jwt.verify(refreshToken,authConfig.secret);
            const {user} = verifyResult;
            userfind = await User.findByPk(user.id);
        }catch(error){
            return res.status(500).json({msg:"Algo ha ido mal en buscar al usuario de refrescar",error:error,token:refreshToken})
        }
        const token = jwt.sign({user:userfind},authConfig.secret,{ expiresIn:authConfig.expires})
        res.status(200).json({token:token})

    }

    public async getUser(req:Request,res:Response){
        res.status(200).json(req.user)
    }

}
export const authController = new AuthController();