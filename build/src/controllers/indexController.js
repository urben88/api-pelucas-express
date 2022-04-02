"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const package_json_1 = __importDefault(require("../../package.json")); //? Da error pero funciona esto es por el tsconfig
class IndexController {
    index(req, res) {
        res.json({
            text: "El api esta en /api/",
            name: package_json_1.default.name,
            author: package_json_1.default.author,
            description: package_json_1.default.description,
            version: package_json_1.default.version,
        });
    }
}
exports.indexController = new IndexController();
