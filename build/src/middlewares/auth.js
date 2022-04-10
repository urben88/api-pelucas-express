"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
const { User } = require('../database/models/index');
exports.default = (req, res, next) => {
    console.log(req.headers);
    //?Comprobar si existe el token
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    }
    else {
        //*Comprobar la validez del token
        let token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, auth_1.default.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            }
            else {
                //*El decoded es el usuario del token (devuelve el objeto del usuario)
                User.findByPk(decoded.user.id, { include: "roles" }).then((user) => {
                    console.log(user.roles);
                    req.user = user;
                    next();
                });
            }
        });
    }
};
