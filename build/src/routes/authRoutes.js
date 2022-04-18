"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
//todo Middleware para las rutas
const auth_1 = __importDefault(require("../middlewares/auth"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', authController_1.authController.index);
        this.router.post('/singin', authController_1.authController.signIn);
        this.router.post('/singup', authController_1.authController.signUp);
        this.router.get('/user', auth_1.default, authController_1.authController.getUser);
        this.router.get('/refresh', auth_1.default, authController_1.authController.refreshToken),
            this.router.put('/update', auth_1.default, authController_1.authController.update);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
