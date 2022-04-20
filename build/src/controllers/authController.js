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
const { User } = require('../database/models'); //! Mirar si le puedo poner un type al ORM
const { Role } = require('../database/models');
const { User_role } = require('../database/models');
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
            yield User.findOne({
                where: {
                    email: email
                },
                include: 'rol'
            }).then((User) => {
                if (!User) {
                    res.status(404).json({ msg: "Usuario no encontrado" });
                }
                else {
                    if (bcryptjs_1.default.compareSync(password, User.password)) {
                        //Devolvemos token
                        //? Creamos el token
                        let token = jsonwebtoken_1.default.sign({ user: User }, auth_1.default.secret, {
                            expiresIn: auth_1.default.expires
                        });
                        res.json({
                            user: User,
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
            let rol = yield Role.findOne({ where: { role: req.body.rol } });
            //*Crear un usuario
            yield User.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: password,
                telefono: req.body.telefono,
                cpostal: req.body.cpostal,
            })
                .then((User) => {
                //? Creamos el token
                let token = jsonwebtoken_1.default.sign({ user: User }, auth_1.default.secret, {
                    expiresIn: auth_1.default.expires
                });
                User_role.create({
                    user_id: User.id,
                    role_id: rol.id
                }).then((User_Role) => {
                    res.json({
                        user: User,
                        token: token,
                    });
                }).catch((error) => {
                    res.status(500).json(error);
                });
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
    }
    //TODO Falta hacer el update
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let passwordencript;
            if (req.body.password) {
                passwordencript = bcryptjs_1.default.hashSync(req.body.password, +auth_1.default.rounds); //? El mas lo tranforma en número
            }
            let user;
            console.log(req.body);
            //? Decodifico el jwt
            jsonwebtoken_1.default.verify((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], auth_1.default.secret, (err, decoded) => {
                user = decoded.user;
                //? Actualizo el usuario
                let resul = decoded;
                if (req.body.password) {
                    resul.password = passwordencript;
                }
                User.update(resul, { where: {
                        id: user.id
                    }
                }).then((newUser) => {
                    res.status(200).json({ msg: "Se ha actualizado con éxito" });
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
            });
        });
    }
    refreshToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            //?Si no existe el token
            if (!refreshToken) {
                res.status(400).json({ msg: "Algo ha ido mal en el refresh del token" });
            }
            let userfind;
            try {
                const verifyResult = jsonwebtoken_1.default.verify(refreshToken, auth_1.default.secret);
                const { user } = verifyResult;
                userfind = yield User.findByPk(user.id);
            }
            catch (error) {
                return res.status(500).json({ msg: "Algo ha ido mal en buscar al usuario de refrescar", error: error, token: refreshToken });
            }
            const token = jsonwebtoken_1.default.sign({ user: userfind }, auth_1.default.secret, { expiresIn: auth_1.default.expires });
            res.status(200).json({ token: token });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(req.user);
        });
    }
}
exports.authController = new AuthController();
