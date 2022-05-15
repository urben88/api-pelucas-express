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
        this.router.delete('/:id', notificacionesController_1.notificacionesController.delete);
        this.router.post('/create', notificacionesController_1.notificacionesController.create);
        this.router.get('/:id', notificacionesController_1.notificacionesController.showOne);
        this.router.put('/:id', notificacionesController_1.notificacionesController.update);
        this.router.get('/isFromActualUser/:id', notificacionesController_1.notificacionesController.isFromActualUser);
        this.router.put('/putLeido/:id', notificacionesController_1.notificacionesController.putLeido);
        this.router.get('/findUserNotificacionesNoLeidas/:id', notificacionesController_1.notificacionesController.findUserNotificacionesNoLeidas);
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
exports.default = medidasRoutes.router;
