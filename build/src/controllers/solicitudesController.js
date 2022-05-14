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
            Solicitudes.findAll({
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ]
            })
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
            Solicitudes.findOne({
                where: { user_id: req.params.id },
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ]
            })
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
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.findOne({
                where: { id: req.params.id },
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ]
            })
                .then((solicitud) => {
                if (solicitud == null) {
                    res.status(404).json({ msg: "No existe la solicitud" });
                }
                else {
                    res.status(200).json(solicitud);
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    userHave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.findOne({ where: { user_id: req.params.id } })
                .then((solicitud) => {
                if (solicitud == null) {
                    res.status(200).json({ have: false });
                }
                else {
                    res.status(200).json({ have: true });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    //Create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //?Para controlar que solo puede hacer una única solicitud
            Solicitudes.findOne({ where: { user_id: req.body.user_id } })
                .then((solicitud) => {
                if (solicitud) {
                    res.status(405).send({ msg: "No puedes crear mas de una solicitud" });
                }
                else {
                    Solicitudes.create(req.body, { include: ['protesis', 'cabello', 'textil'] })
                        .then((solicitud) => {
                        res.status(200).send(solicitud);
                    })
                        .catch((err) => {
                        res.status(500).send(err);
                    });
                }
            });
        });
    }
    //Update Status
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if(req.body.aceptado){
            Solicitudes.update(req.body, { where: { id: req.params.id } }).then((status) => {
                res.status(200).json(status);
            })
                .catch((err) => {
                res.status(500).json(err);
            });
            // }else{
            //     res.status(401).json({msg:"Solo puedes modificar el estado"})
            // }
        });
    }
    //Update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userReqId = req.params.id;
            Solicitudes.update(req.body, {
                where: { user_id: userReqId },
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                ]
            })
                .then((statusUpdated) => {
                if (statusUpdated) {
                    // res.status(200).json(cheque)
                    Solicitudes.findOne({
                        where: { user_id: userReqId },
                        include: [
                            { model: Cabellos, as: "cabello" },
                            { model: Protesis, as: "protesis" },
                            { model: Textiles, as: "textil" },
                            { model: Cheques_regalo, as: "cheque_regalo" },
                        ]
                    })
                        .then((actualizado) => {
                        //! Cabello
                        if (req.body.cabello) {
                            //? Para saber si ya existia
                            if (actualizado.cabello) {
                                Cabellos.update(req.body.cabello[0], { where: { id: actualizado.cabello.id } }).then((res2) => {
                                    if (res2) {
                                        if (req.body.textil) {
                                            if (actualizado.textil) {
                                                //aqui
                                                Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3) => {
                                                    if (res3) {
                                                        Solicitudes.findOne({
                                                            where: { user_id: userReqId },
                                                            include: [
                                                                { model: Cabellos, as: "cabello" },
                                                                { model: Protesis, as: "protesis" },
                                                                { model: Textiles, as: "textil" },
                                                                { model: Cheques_regalo, as: "cheque_regalo" },
                                                            ]
                                                        }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                                    }
                                                    else {
                                                        res.status(500).json({ msg: "Error al actualizar el pañuelo" });
                                                    }
                                                });
                                            }
                                            else {
                                                Textiles.create(req.body.textil).then((res7) => {
                                                    Solicitudes.findOne({
                                                        where: { user_id: userReqId },
                                                        include: [
                                                            { model: Cabellos, as: "cabello" },
                                                            { model: Protesis, as: "protesis" },
                                                            { model: Textiles, as: "textil" },
                                                            { model: Cheques_regalo, as: "cheque_regalo" },
                                                        ]
                                                    }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                                });
                                            }
                                        }
                                        else {
                                            Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6) => {
                                                Solicitudes.findOne({
                                                    where: { user_id: userReqId },
                                                    include: [
                                                        { model: Cabellos, as: "cabello" },
                                                        { model: Protesis, as: "protesis" },
                                                        { model: Textiles, as: "textil" },
                                                        { model: Cheques_regalo, as: "cheque_regalo" },
                                                    ]
                                                }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                            });
                                        }
                                    }
                                    else {
                                        res.status(500).json({ msg: "Error al actualizar el cabello" });
                                    }
                                });
                            }
                            else {
                                Cabellos.create(req.body.cabello).then((res2) => {
                                    //Comporbar textil
                                    if (res2) {
                                        if (req.body.textil) {
                                            if (actualizado.textil) {
                                                //aqui
                                                Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3) => {
                                                    if (res3) {
                                                        Solicitudes.findOne({
                                                            where: { user_id: userReqId },
                                                            include: [
                                                                { model: Cabellos, as: "cabello" },
                                                                { model: Protesis, as: "protesis" },
                                                                { model: Textiles, as: "textil" },
                                                                { model: Cheques_regalo, as: "cheque_regalo" },
                                                            ]
                                                        }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                                    }
                                                    else {
                                                        res.status(500).json({ msg: "Error al actualizar el pañuelo" });
                                                    }
                                                });
                                            }
                                            else {
                                                Textiles.create(req.body.textil).then((res7) => {
                                                    Solicitudes.findOne({
                                                        where: { user_id: userReqId },
                                                        include: [
                                                            { model: Cabellos, as: "cabello" },
                                                            { model: Protesis, as: "protesis" },
                                                            { model: Textiles, as: "textil" },
                                                            { model: Cheques_regalo, as: "cheque_regalo" },
                                                        ]
                                                    }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                                });
                                            }
                                        }
                                        else {
                                            Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6) => {
                                                Solicitudes.findOne({
                                                    where: { user_id: userReqId },
                                                    include: [
                                                        { model: Cabellos, as: "cabello" },
                                                        { model: Protesis, as: "protesis" },
                                                        { model: Textiles, as: "textil" },
                                                        { model: Cheques_regalo, as: "cheque_regalo" },
                                                    ]
                                                }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        else {
                            Cabellos.destroy({ where: { id: actualizado.cabello.id } }).catch((err) => res.status(500).json(err));
                        }
                        //!Protesis
                        if (req.body.protesis) {
                            Protesis.update(req.body.protesis[0], { where: { id: actualizado.protesis.id } }).then((res2) => {
                                if (res2) {
                                    if (req.body.textil) {
                                        Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3) => {
                                            if (res3) {
                                                Solicitudes.findOne({
                                                    where: { user_id: userReqId },
                                                    include: [
                                                        { model: Cabellos, as: "cabello" },
                                                        { model: Protesis, as: "protesis" },
                                                        { model: Textiles, as: "textil" },
                                                        { model: Cheques_regalo, as: "cheque_regalo" },
                                                    ]
                                                }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                            }
                                            else {
                                                res.status(500).json({ msg: "Error al actualizar el pañuelo" });
                                            }
                                        }).catch((err) => res.status(500).json(err));
                                    }
                                    else {
                                        Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6) => {
                                            Solicitudes.findOne({
                                                where: { user_id: userReqId },
                                                include: [
                                                    { model: Cabellos, as: "cabello" },
                                                    { model: Protesis, as: "protesis" },
                                                    { model: Textiles, as: "textil" },
                                                    { model: Cheques_regalo, as: "cheque_regalo" },
                                                ]
                                            }).then((res4) => { res.status(200).json(res4); }).catch((err) => res.status(500).json(err));
                                        }).catch((err) => res.status(500).json(err));
                                    }
                                }
                                else {
                                    res.status(500).json({ msg: "Error al actualizar la prótesis" });
                                }
                            });
                        }
                        else {
                            Protesis.destroy({ where: { id: actualizado.protesis.id } }).catch((err) => res.status(500).json(err));
                        }
                        // if(actualizado){
                        //     res.status(200).send(actualizado)
                        // }else{
                        //     res.status(404).send({msg:"No existe la solicitud para actualizar 2",actualizado,id:id}) 
                        // }
                    })
                        .catch((err) => {
                        res.status(500).json(err);
                    });
                    // // Solicitudes.findOne(
                    // //         {
                    // //             where:{user_id:userReqId},
                    // //             include:[
                    // //                 {model:Cabellos,as:"cabello"},
                    // //                 {model:Protesis,as:"protesis"},
                    // //                 {model:Textiles,as:"textil"},
                    // //                 {model:Cheques_regalo,as:"cheque_regalo"},
                    // //             ]
                    // //         })
                    // //     .then((actualizado:any)=>{
                    // //         res.status(200).json(actualizado)
                    // //     })
                }
                else {
                    res.status(404).send({ msg: "No existe una solicitud para actualizar 1" });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
        });
    }
    //Delete
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Solicitudes.destroy({ where: { id: req.params.id }, force: true })
                .then((resul) => {
                if (resul == 0) {
                    res.status(404).json({ msg: "No existe la solicitud que buscas" });
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
exports.solicitudesController = new SolicitudesController();
