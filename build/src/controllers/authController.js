"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//? Importo el modelo user
const { user } = require('../database/models/user'); //! Mirar si le puedo poner un type al ORM
//? Configuración para el auth
const auth_1 = __importDefault(require("../../config/auth"));
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class AuthController {
    //? Main
    index(req, res) {
        res.json({
            text: 'Estas en la creación de tokens'
        });
    }
    //?Login
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            yield user.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (!user) {
                    res.status(404).json({ msg: "Usuario no encontrado" });
                }
                else {
                    if (bcryptjs_1.default.compareSync(password, user.password)) {
                        //Devolvemos token
                        //? Creamos el token
                        let token = jsonwebtoken_1.default.sign({ user: user }, auth_1.default.secret, {
                            expiresIn: auth_1.default.expires
                        });
                        res.json({
                            user: user,
                            token: token
                        });
                    }
                    else {
                        // Unauthorized Access
                        res.status(401).json({ msg: "Contraseña incorrecta" });
                    }
                }
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
    }
    //?Registro
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //? Encriptamos la contraseña
            let password = bcryptjs_1.default.hashSync(req.body.password, +auth_1.default.rounds); //? El mas lo tranforma en número
            //*Crear un usuario
            yield user.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: password
            })
                .then((user) => {
                //? Creamos el token
                let token = jsonwebtoken_1.default.sign({ user: user }, auth_1.default.secret, {
                    expiresIn: auth_1.default.expires
                });
                res.json({
                    user: user,
                    token: token
                });
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
    }
}
exports.authController = new AuthController();
