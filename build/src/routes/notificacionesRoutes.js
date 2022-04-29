"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificacionesController_1 = require("../controllers/notificacionesController");
class Datos_ClinicosRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', notificacionesController_1.notificacionesController.index);
        this.router.get('/actual', notificacionesController_1.notificacionesController.actual);
        this.router.get('/findByUserId/:id', notificacionesController_1.notificacionesController.findUserNotificaciones);
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
exports.default = medidasRoutes.router;
