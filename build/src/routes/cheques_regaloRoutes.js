"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheques_regaloController_1 = require("../controllers/cheques_regaloController");
class Cheques_regaloRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', cheques_regaloController_1.chequesRegaloController.index);
        this.router.get('/findAll', cheques_regaloController_1.chequesRegaloController.findAll);
        this.router.put('/:id', cheques_regaloController_1.chequesRegaloController.update);
        this.router.delete('/:id', cheques_regaloController_1.chequesRegaloController.remove);
        this.router.post('/create', cheques_regaloController_1.chequesRegaloController.create);
    }
}
const cheques_regaloRoutes = new Cheques_regaloRoutes();
exports.default = cheques_regaloRoutes.router;
