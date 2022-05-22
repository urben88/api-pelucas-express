"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../database/models/index');
exports.default = (req, res, next) => {
    console.log(req.headers);
    //?Comprobar si existe el token
    if (!User.isAdmin(req.user.rol)) {
        res.status(401).json({ msg: "Solo puedes acceder si eres admin" });
    }
    else {
        next();
    }
};
