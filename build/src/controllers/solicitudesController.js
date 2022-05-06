"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitudesController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user');
const { Solicitudes } = require('../database/models/index');
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
}
exports.solicitudesController = new SolicitudesController();
