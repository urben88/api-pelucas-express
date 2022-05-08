"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solicitudesController_1 = require("../controllers/solicitudesController");
class SolicitudesRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', solicitudesController_1.solicitudesController.index);
        this.router.get('/findAll', solicitudesController_1.solicitudesController.findAll);
        this.router.get('/findAllSimple', solicitudesController_1.solicitudesController.findAllSimple);
        this.router.get('/findOneByUser/:id', solicitudesController_1.solicitudesController.findOneByUser);
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)
    }
}
const solicitudesRoutes = new SolicitudesRoutes();
exports.default = solicitudesRoutes.router;
