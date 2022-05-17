"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cabellosController_1 = require("../controllers/cabellosController");
const admin_1 = __importDefault(require("../middlewares/admin"));
class CabellosRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', admin_1.default, cabellosController_1.cabellosController.index);
        // this.router.get('/findAll',chequesRegaloController.findAll)
        // this.router.put('/:id',chequesRegaloController.update)
        // this.router.delete('/:id',chequesRegaloController.remove)
        // this.router.post('/create',chequesRegaloController.create)
    }
}
const cabellosRoutes = new CabellosRoutes();
exports.default = cabellosRoutes.router;
