"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: "El api esta en /api/" });
    }
}
exports.indexController = new IndexController();
