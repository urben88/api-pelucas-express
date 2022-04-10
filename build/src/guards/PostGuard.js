"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../database/models/index');
//Todo Como este "Middleware" que hace de Guard lo pongo al final de las rutas el req ya contiente tanto el rol,el post... todos los que estan antes"
exports.default = {
    //Para ver un post
    show(req, res, next) {
        //? Saber si es el propietario del post
        if (req.user.id == req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        }
        else {
            res.status(401).json({ msg: "No estas autorizado para ver esta publicación" });
        }
    },
    //Para eliminar un post
    delete(req, res, next) {
        //? Saber si es el propietario del post
        if (req.user.id == req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        }
        else {
            res.status(401).json({ msg: "No estas autorizado para ver esta publicación" });
        }
    },
    //Para actualizar un post
    update(req, res, next) {
        //? Saber si es el propietario del post
        if (req.user.id == req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        }
        else {
            res.status(401).json({ msg: "No estas autorizado para ver esta publicación" });
        }
    }
};
