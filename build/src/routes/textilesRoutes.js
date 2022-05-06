"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const textilesController_1 = require("../controllers/textilesController");
class TextilesRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', textilesController_1.textilesController.index);
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)
    }
}
const textilesRoutes = new TextilesRoutes();
exports.default = textilesRoutes.router;
