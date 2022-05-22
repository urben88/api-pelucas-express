import { Request, Response } from 'express';
//? Lo importo de esta manera para que funcionen y ver las ayudas me he descargado los @types
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//? Importo el modelo user
const { user } = require('../database/models/user');

//? Configuración para el auth
import authConfig from '../../config/auth'

//? Importo la interfazes creadas por mi
import { Error } from '../interfaces/error';
import { UserI } from '../interfaces/User';

const { Solicitudes, Cabellos, Protesis, Cheques_regalo, Textiles } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class SolicitudesController {


    //? Index
    public index(req: Request, res: Response) {
        res.json({
            text: "Estas en solicitudes",
        });
    }

    async findAll(req: Request, res: Response) {
        Solicitudes.findAll({
            include: [
                { model: Cabellos, as: "cabello" },
                { model: Protesis, as: "protesis" },
                { model: Textiles, as: "textil" },
                { model: Cheques_regalo, as: "cheque_regalo" },
            ]
        })
            .then((solicitudes: any) => {
                if (solicitudes == null) {
                    res.status(404).json({ msg: "No exiten solicitudes" })
                } else {
                    res.status(200).json(solicitudes);
                }
            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }
    async findAllSimple(req: Request, res: Response) {
        Solicitudes.findAll()
            .then((solicitudes: any) => {
                if (solicitudes == null) {
                    res.status(404).json({ msg: "No exiten solicitudes" })
                } else {
                    res.status(200).json(solicitudes);
                }
            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }
    async findOneByUser(req: Request, res: Response) {
        Solicitudes.findOne(
            {
                where: { user_id: req.params.id },
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ]

            })
            .then((solicitud: any) => {
                if (solicitud == null) {
                    res.status(404).json({ msg: "No tiene ninguna solicitud" })
                } else {
                    res.status(200).json(solicitud);
                }
            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }
    async findOne(req: Request, res: Response) {
        Solicitudes.findOne(
            {
                where: { id: req.params.id },
                include: [
                    { model: Cabellos, as: "cabello" },
                    { model: Protesis, as: "protesis" },
                    { model: Textiles, as: "textil" },
                    { model: Cheques_regalo, as: "cheque_regalo" },
                ]

            })
            .then((solicitud: any) => {
                if (solicitud == null) {
                    res.status(404).json({ msg: "No existe la solicitud" })
                } else {
                    res.status(200).json(solicitud);
                }
            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }

    async userHave(req: Request, res: Response) {
        Solicitudes.findOne(
            { where: { user_id: req.params.id } }
        )
            .then((solicitud: any) => {
                if (solicitud == null) {
                    res.status(200).json({ have: false })
                } else {
                    res.status(200).json({ have: true });
                }
            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }



    //Create
    async create(req: Request, res: Response) {

        //?Para controlar que solo puede hacer una única solicitud
        Solicitudes.findOne({ where: { user_id: req.body.user_id } })
            .then((solicitud: any) => {
                if (solicitud) {
                    res.status(405).send({ msg: "No puedes crear mas de una solicitud" })
                } else {
                    Solicitudes.create(req.body, { include: ['protesis', 'cabello', 'textil'] })
                        .then((solicitud: any) => {
                            res.status(200).send(solicitud)
                        })
                        .catch((err: any) => {
                            res.status(500).send(err)
                        })
                }
            })

    }

    //Update Status
    async updateStatus(req: Request, res: Response) {
        // if(req.body.aceptado){
            Solicitudes.update(req.body,{where:{id:req.params.id}}).then(
                (status:any)=>{
                    res.status(200).json(status);
                }
            )
            .catch(
                (err:any)=>{
                    res.status(500).json(err)
                }
            )
        // }else{
        //     res.status(401).json({msg:"Solo puedes modificar el estado"})
        // }
    }

    //Update
    async update(req: Request, res: Response) {
        let userReqId = req.params.id;
        Solicitudes.update(req.body, {
            where: { user_id: userReqId },
            include: [
                { model: Cabellos, as: "cabello" },
                { model: Protesis, as: "protesis" },
                { model: Textiles, as: "textil" },
            ]
        })
            .then((statusUpdated: any) => {
                if (statusUpdated) {
                    // res.status(200).json(cheque)
                    Solicitudes.findOne(
                        {
                            where: { user_id: userReqId },
                            include: [
                                { model: Cabellos, as: "cabello" },
                                { model: Protesis, as: "protesis" },
                                { model: Textiles, as: "textil" },
                                { model: Cheques_regalo, as: "cheque_regalo" },
                            ]
                        })
                        .then((actualizado: any) => {

                            //! Cabello
                            if (req.body.cabello) {
                                //? Para saber si ya existia
                                if (actualizado.cabello) {
                                    Cabellos.update(req.body.cabello[0], { where: { id: actualizado.cabello.id } }).then((res2: any) => {
                                        if (res2) {
                                            if (req.body.textil) {
                                                if (actualizado.textil) {
                                                    //aqui
                                                    Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3: any) => {
                                                        if (res3) {
                                                            Solicitudes.findOne(
                                                                {
                                                                    where: { user_id: userReqId },
                                                                    include: [
                                                                        { model: Cabellos, as: "cabello" },
                                                                        { model: Protesis, as: "protesis" },
                                                                        { model: Textiles, as: "textil" },
                                                                        { model: Cheques_regalo, as: "cheque_regalo" },
                                                                    ]
                                                                }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                        } else {
                                                            res.status(500).json({ msg: "Error al actualizar el pañuelo" })
                                                        }
                                                    })
                                                } else {
                                                    Textiles.create(req.body.textil).then((res7: any) => {
                                                        Solicitudes.findOne(
                                                            {
                                                                where: { user_id: userReqId },
                                                                include: [
                                                                    { model: Cabellos, as: "cabello" },
                                                                    { model: Protesis, as: "protesis" },
                                                                    { model: Textiles, as: "textil" },
                                                                    { model: Cheques_regalo, as: "cheque_regalo" },
                                                                ]
                                                            }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                    })
                                                }

                                            } else {
                                                Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6: any) => {
                                                    Solicitudes.findOne(
                                                        {
                                                            where: { user_id: userReqId },
                                                            include: [
                                                                { model: Cabellos, as: "cabello" },
                                                                { model: Protesis, as: "protesis" },
                                                                { model: Textiles, as: "textil" },
                                                                { model: Cheques_regalo, as: "cheque_regalo" },
                                                            ]
                                                        }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                })
                                            }
                                        } else {
                                            res.status(500).json({ msg: "Error al actualizar el cabello" })
                                        }
                                    })
                                } else {
                                    Cabellos.create(req.body.cabello).then((res2: any) => {
                                        //Comporbar textil
                                        if (res2) {
                                            if (req.body.textil) {
                                                if (actualizado.textil) {
                                                    //aqui
                                                    Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3: any) => {
                                                        if (res3) {
                                                            Solicitudes.findOne(
                                                                {
                                                                    where: { user_id: userReqId },
                                                                    include: [
                                                                        { model: Cabellos, as: "cabello" },
                                                                        { model: Protesis, as: "protesis" },
                                                                        { model: Textiles, as: "textil" },
                                                                        { model: Cheques_regalo, as: "cheque_regalo" },
                                                                    ]
                                                                }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                        } else {
                                                            res.status(500).json({ msg: "Error al actualizar el pañuelo" })
                                                        }
                                                    })
                                                } else {
                                                    Textiles.create(req.body.textil).then((res7: any) => {
                                                        Solicitudes.findOne(
                                                            {
                                                                where: { user_id: userReqId },
                                                                include: [
                                                                    { model: Cabellos, as: "cabello" },
                                                                    { model: Protesis, as: "protesis" },
                                                                    { model: Textiles, as: "textil" },
                                                                    { model: Cheques_regalo, as: "cheque_regalo" },
                                                                ]
                                                            }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                    })
                                                }
                                            } else {
                                                Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6: any) => {
                                                    Solicitudes.findOne(
                                                        {
                                                            where: { user_id: userReqId },
                                                            include: [
                                                                { model: Cabellos, as: "cabello" },
                                                                { model: Protesis, as: "protesis" },
                                                                { model: Textiles, as: "textil" },
                                                                { model: Cheques_regalo, as: "cheque_regalo" },
                                                            ]
                                                        }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                })
                                            }
                                        }
                                    })
                                }

                            } else {
                                Cabellos.destroy({ where: { id: actualizado.cabello.id } }).catch((err: any) => res.status(500).json(err))
                            }




                            //!Protesis
                            if (req.body.protesis) {
                                Protesis.update(req.body.protesis[0], { where: { id: actualizado.protesis.id } }).then((res2: any) => {
                                    if (res2) {
                                        if (req.body.textil) {
                                            Textiles.update(req.body.textil[0], { where: { id: actualizado.textil.id } }).then((res3: any) => {
                                                if (res3) {
                                                    Solicitudes.findOne(
                                                        {
                                                            where: { user_id: userReqId },
                                                            include: [
                                                                { model: Cabellos, as: "cabello" },
                                                                { model: Protesis, as: "protesis" },
                                                                { model: Textiles, as: "textil" },
                                                                { model: Cheques_regalo, as: "cheque_regalo" },
                                                            ]
                                                        }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                                } else {
                                                    res.status(500).json({ msg: "Error al actualizar el pañuelo" })
                                                }
                                            }).catch((err: any) => res.status(500).json(err))
                                        } else {
                                            Textiles.destroy({ where: { id: actualizado.textil.id } }).then((res6: any) => {
                                                Solicitudes.findOne(
                                                    {
                                                        where: { user_id: userReqId },
                                                        include: [
                                                            { model: Cabellos, as: "cabello" },
                                                            { model: Protesis, as: "protesis" },
                                                            { model: Textiles, as: "textil" },
                                                            { model: Cheques_regalo, as: "cheque_regalo" },
                                                        ]
                                                    }).then((res4: any) => { res.status(200).json(res4) }).catch((err: any) => res.status(500).json(err))
                                            }).catch((err: any) => res.status(500).json(err))
                                        }
                                    } else {
                                        res.status(500).json({ msg: "Error al actualizar la prótesis" })
                                    }
                                })
                            } else {
                                Protesis.destroy({ where: { id: actualizado.protesis.id } }).catch((err: any) => res.status(500).json(err))
                            }
                            // if(actualizado){
                            //     res.status(200).send(actualizado)
                            // }else{
                            //     res.status(404).send({msg:"No existe la solicitud para actualizar 2",actualizado,id:id}) 
                            // }
                        })
                        .catch((err: any) => {
                            res.status(500).json(err)
                        })


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
                } else {
                    res.status(404).send({ msg: "No existe una solicitud para actualizar 1" })
                }

            }).catch((err: any) => {
                res.status(500).json(err)
            })
    }

    //Delete
    async remove(req: Request, res: Response) {
        Solicitudes.destroy({ where: { id: req.params.id }, force: true })
            .then((resul: any) => {
                if (resul == 0) {
                    res.status(404).json({ msg: "No existe la solicitud que buscas" })
                } else {
                    res.status(200).json({ msg: "Eliminado correctamente" })
                }
            }).catch((err: Error) => {
                res.status(500).json(err)
            })
    }

}
export const solicitudesController = new SolicitudesController();