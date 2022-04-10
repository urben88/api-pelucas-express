"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
// import pkg from '../../package.json'; //? Da error pero funciona esto es por el tsconfig
class IndexController {
    index(req, res) {
        res.json({
            text: "El api esta en /api/",
            // name: pkg.name,
            // author: pkg.author,
            // description: pkg.description,
            // version: pkg.version,
        });
    }
}
exports.indexController = new IndexController();
