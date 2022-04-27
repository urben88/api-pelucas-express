"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const centrosController_1 = require("../controllers/centrosController");
//todo Middleware para las rutas
const auth_1 = __importDefault(require("../middlewares/auth"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', centrosController_1.centrosController.index);
        this.router.get('/findBy/:attr/:value', centrosController_1.centrosController.findBy);
        this.router.put('/update', auth_1.default, centrosController_1.centrosController.update);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
