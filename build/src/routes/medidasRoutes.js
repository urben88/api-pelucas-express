"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medidasController_1 = require("../controllers/medidasController");
class Datos_ClinicosRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', medidasController_1.medidasController.index);
        this.router.get('/actual', medidasController_1.medidasController.actual);
        this.router.get('/findUserMedidas/:id', medidasController_1.medidasController.findUserMedidas);
        this.router.post('/create', medidasController_1.medidasController.create);
        this.router.put('/:id', medidasController_1.medidasController.update);
        this.router.delete('/:id', medidasController_1.medidasController.remove);
        this.router.get('/actualHave', medidasController_1.medidasController.actualHave);
    }
}
const medidasRoutes = new Datos_ClinicosRoutes();
exports.default = medidasRoutes.router;
