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
exports.notificacionesController = void 0;
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
const { Medidas, User, Notificaciones } = require('../database/models');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class NotificacionesController {
    index(req, res) {
        res.json({
            text: "Estas en notificaciones",
        });
    }
    actual(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            Notificaciones.findAll({ where: { user_id: user.id } })
                .then((notificaciones) => {
                if (notificaciones == null) {
                    res.status(404).json({ msg: "No tiene notificaciones" });
                }
                else {
                    res.status(200).json(notificaciones);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    isFromActualUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            Notificaciones.findOne({ where: { user_id: user.id, id: req.params.id } })
                .then((notificacion) => {
                if (notificacion == null) {
                    res.status(404).json({ msg: "No exite la notificacion" });
                }
                else {
                    res.status(200).json(notificacion);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findUserNotificaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            Notificaciones.findAll({ where: { user_id: id } })
                .then((notificaciones) => {
                if (notificaciones == null) {
                    res.status(404).json({ msg: "No tiene notificaciones" });
                }
                else {
                    res.status(200).json(notificaciones);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    findUserNotificacionesNoLeidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            Notificaciones.findAll({ where: { user_id: id, leido: false } })
                .then((notificaciones) => {
                if (notificaciones == null) {
                    res.status(404).json({ msg: "No tiene notificaciones" });
                }
                else {
                    res.status(200).json(notificaciones);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Notificaciones.destroy({ where: { id: req.params.id }, force: true })
                .then((resul) => {
                if (resul == 0) {
                    res.status(404).json({ msg: "No existe la notificación que buscas" });
                }
                else {
                    res.status(200).json({ msg: "Eliminado correctamente" });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Notificaciones.create(req.body)
                .then((resul) => {
                Notificaciones.findOne({ where: { id: resul.id } })
                    .then((noti) => {
                    res.status(200).json(noti);
                })
                    .catch((err) => {
                    res.status(500).json(err);
                });
            })
                .catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Notificaciones.findOne({ where: { id: req.params.id } })
                .then((resul) => {
                if (resul == null) {
                    res.status(404).json({ msg: "No se ha encontrado ninguna notificación con esa id" });
                }
                else {
                    res.status(200).json(resul);
                }
            })
                .catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Notificaciones.update(req.body, { where: { id: req.params.id } })
                .then((resul) => {
                if (resul == null) {
                    res.status(404).json({ msg: "No se ha encontrado ninguna notificación con esa id" });
                }
                else {
                    Notificaciones.findOne({ where: { id: req.params.id } })
                        .then((noti) => {
                        res.status(200).json(noti);
                    })
                        .catch((err) => {
                        res.status(500).json(err);
                    });
                }
            })
                .catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    putLeido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Notificaciones.update({ leido: true }, { where: { id: req.params.id } })
                .then((resul) => {
                if (resul == null) {
                    res.status(404).json({ msg: "No se ha encontrado ninguna notificación con esa id" });
                }
                else {
                    Notificaciones.findOne({ where: { id: req.params.id } })
                        .then((noti) => {
                        res.status(200).json(noti);
                    })
                        .catch((err) => {
                        res.status(500).json(err);
                    });
                }
            })
                .catch((err) => {
                res.status(500).json(err);
            });
        });
    }
}
exports.notificacionesController = new NotificacionesController();
