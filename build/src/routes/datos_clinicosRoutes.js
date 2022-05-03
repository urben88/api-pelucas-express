"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datos_clinicosController_1 = require("../controllers/datos_clinicosController");
class Datos_ClinicosRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', datos_clinicosController_1.datos_clinicosController.index);
        this.router.get('/actual', datos_clinicosController_1.datos_clinicosController.datosActual);
        this.router.get('/findUserDatosClinicos/:id', datos_clinicosController_1.datos_clinicosController.findUserDatosClinicos);
        this.router.post('/create', datos_clinicosController_1.datos_clinicosController.create);
        this.router.put('/:id', datos_clinicosController_1.datos_clinicosController.update);
        this.router.delete('/:id', datos_clinicosController_1.datos_clinicosController.remove);
    }
}
const datos_ClinicosRoutes = new Datos_ClinicosRoutes();
exports.default = datos_ClinicosRoutes.router;
