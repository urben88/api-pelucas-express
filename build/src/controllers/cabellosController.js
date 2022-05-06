"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cabellosController = void 0;
//? Importo el modelo user
const { user } = require('../database/models/user');
const { Cabellos } = require('../database/models/index');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class CabellosController {
    //? Index
    index(req, res) {
        res.json({
            text: "Estas en cabellos",
        });
    }
}
exports.cabellosController = new CabellosController();
