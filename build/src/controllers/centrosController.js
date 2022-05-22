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
exports.centrosController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user'); //! Mirar si le puedo poner un type al ORM
const { Centros } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class CentrosController {
    //? Index
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Centros.findAll()
                .then((centros) => {
                if (centros) {
                    res.status(200).json(centros);
                }
                else {
                    res.status(404).json({ msg: "No se ha encontrado ningun centro" });
                }
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        });
    }
    //? Find
    findBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let atributo = req.params.attr;
            let value = req.params.value;
            let json = {};
            json[atributo] = value;
            yield Centros.findAll({ 'where': json })
                .then((centros) => {
                if (centros) {
                    res.status(200).json(centros);
                }
                else {
                    res.status(404).json({ msg: "No se ha encontrado ningun centro con " + atributo + " = " + value });
                }
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        });
    }
    //?Show
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
    //? Update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Centros.update(req.body, { where: { id: req.body.id } })
                .then((centro) => {
                if (centro == null) {
                    res.status(404).json({ msg: "No existe centro con ese id" });
                }
                else {
                    res.status(200).json(centro);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    //?Delete Sin acabar
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
exports.centrosController = new CentrosController();
