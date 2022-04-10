"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
//!Guards
const PostGuard_1 = __importDefault(require("../guards/PostGuard"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.default)();
        this.config();
    }
    config() {
        this.router.get('/', postController_1.postController.index);
        this.router.get('/:id', postController_1.postController.find, PostGuard_1.default.show, postController_1.postController.show);
        this.router.put('/:id', postController_1.postController.find, PostGuard_1.default.update, postController_1.postController.update);
        this.router.delete('/:id', postController_1.postController.find, PostGuard_1.default.delete, postController_1.postController.delete);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
