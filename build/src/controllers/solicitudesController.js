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
exports.solicitudesController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user');
const { Solicitudes, Cabellos, Protesis, Cheques_regalo, Textiles } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class SolicitudesController {
    //? Index
    index(req, res) {
        res.json({
            text: "Estas en solicitudes",
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.findAll({ include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ] })
                .then((solicitudes) => {
                if (solicitudes == null) {
                    res.status(404).json({ msg: "No exiten solicitudes" });
                }
                else {
                    res.status(200).json(solicitudes);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findAllSimple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.findAll()
                .then((solicitudes) => {
                if (solicitudes == null) {
                    res.status(404).json({ msg: "No exiten solicitudes" });
                }
                else {
                    res.status(200).json(solicitudes);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findOneByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.findOne({ where: { user_id: req.params.id } }, { include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ] })
                .then((solicitud) => {
                if (solicitud == null) {
                    res.status(404).json({ msg: "No tiene ninguna solicitud" });
                }
                else {
                    res.status(200).json(solicitud);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
}
exports.solicitudesController = new SolicitudesController();
