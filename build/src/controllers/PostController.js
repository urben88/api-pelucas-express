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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user'); //! Mirar si le puedo poner un type al ORM
const { Post } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class PostController {
    //? Find este es un método que actuará como middleware y será reusado
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield Post.findByPk(req.params.id);
            if (!post) {
                res.status(404).json({ msg: "No se ha encontrado ningun post" });
            }
            else {
                req.post = post;
                next();
            }
        });
    }
    //? Index
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Post.findAll()
                .then((posts) => {
                if (posts) {
                    res.status(200).json(posts);
                }
                else {
                    res.status(404).json({ msg: "No se ha encontrado ningun post" });
                }
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        });
    }
    //Show
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(req.post);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    //Update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.post.title = req.body.title;
                req.post.body = req.body.body;
                req.post.save().then((post) => {
                    res.status(200).json(post);
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    //Delete
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.post.destroy().then((post) => {
                    res.status(200).json({ post, msg: "El post ha sido eliminado" });
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.postController = new PostController();
