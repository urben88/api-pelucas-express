"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', authController_1.authController.index);
        this.router.post('/singin', authController_1.authController.signIn);
        this.router.post('/singup', authController_1.authController.signUp);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
