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
exports.chequesRegaloController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user'); //! Mirar si le puedo poner un type al ORM
const { Post, Cheques_regalo } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class ChequesRegaloController {
    //? Index
    index(req, res) {
        res.json({
            text: "Estas en cheques regalo",
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Cheques_regalo.findAll()
                .then((cheques) => {
                if (cheques == null) {
                    res.status(404).json({ msg: "No exiten cheques" });
                }
                else {
                    res.status(200).json(cheques);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    //Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Cheques_regalo.create(req.body)
                .then((medida) => {
                res.status(200).send(medida);
            })
                .catch((err) => {
                res.status(500).send(err);
            });
        });
    }
    //Update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Cheques_regalo.update(req.body, { where: { id: req.params.id } })
                .then((cheque) => {
                if (cheque) {
                    Cheques_regalo.findOne({ where: { id: req.params.id } })
                        .then((actualizado) => {
                        if (actualizado) {
                            res.status(200).send(actualizado);
                        }
                        else {
                            res.status(404).send({ msg: "No existe el cheque regalo para actualizar" });
                        }
                    })
                        .catch((err) => {
                        res.status(500).json(err);
                    });
                }
                else {
                    res.status(404).send({ msg: "No existe el cheque regalo para actualizar" });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    //Delete
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Cheques_regalo.destroy({ where: { id: req.params.id }, force: true })
                .then((resul) => {
                if (resul == 0) {
                    res.status(404).json({ msg: "No existe el cheque regalo que buscas" });
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
exports.chequesRegaloController = new ChequesRegaloController();
