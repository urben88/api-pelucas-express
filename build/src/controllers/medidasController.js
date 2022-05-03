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
exports.medidasController = void 0;
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const { Medidas, User } = require('../database/models');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso 406 Not Acceptable
//? 500 Error del servidor
class MedidasController {
    index(req, res) {
        res.json({
            text: "Estas en medidas",
        });
    }
    actual(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            Medidas.findOne({ where: { user_id: user.id } })
                .then((medidas) => {
                if (medidas == null) {
                    res.status(404).json({ msg: "No tiene medidas registradas" });
                }
                else {
                    res.status(200).json(medidas);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findUserMedidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Medidas.findOne({ where: { user_id: req.params.id } })
                .then((medidas) => {
                if (medidas == null) {
                    res.status(404).json({ msg: "No tiene medidas registradas" });
                }
                else {
                    res.status(200).json(medidas);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Medidas.findOne({ where: { user_id: req.body.user_id } })
                .then((encontrada) => {
                if (encontrada) {
                    res.status(406).send({ msg: "Ya existe una medida registrada de este usuario" });
                }
                else {
                    Medidas.create(req.body)
                        .then((medida) => {
                        res.status(200).send(medida);
                    }).catch((err) => {
                        res.status(500).json(err);
                    });
                }
            })
                .catch((err) => {
                res.status(500).send(err);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Medidas.update(req.body, { where: { user_id: req.params.id } })
                .then((medida) => {
                if (medida) {
                    Medidas.findOne({ where: { user_id: req.params.id } })
                        .then((actualizado) => {
                        if (actualizado) {
                            res.status(200).send(actualizado);
                        }
                        else {
                            res.status(404).send({ msg: "No tiene medidas para actualizar" });
                        }
                    })
                        .catch((err) => {
                        res.status(500).json(err);
                    });
                }
                else {
                    res.status(404).send({ msg: "No tiene medidas para actualizar" });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Medidas.destroy({ where: { id: req.params.id }, force: true })
                .then((resul) => {
                if (resul == 0) {
                    res.status(404).json({ msg: "No existe la medida que buscas" });
                }
                else {
                    res.status(200).json({ msg: "Eliminado correctamente" });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
}
exports.medidasController = new MedidasController();
