"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peliculasController_1 = require("../controllers/peliculasController");
class PeliculasRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', peliculasController_1.peliculasController.list);
        this.router.get('/:id', peliculasController_1.peliculasController.getById);
        this.router.post('/', peliculasController_1.peliculasController.create);
        this.router.delete('/:id', peliculasController_1.peliculasController.delete);
        this.router.put('/:id', peliculasController_1.peliculasController.update);
    }
}
const peliculasRoutes = new PeliculasRoutes();
exports.default = peliculasRoutes.router;
