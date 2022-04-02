"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peliculasController = void 0;
const database_1 = __importDefault(require("../database/database"));
//Todo Tipos de status a usar
//? 200 OK
//? 404 No se encontro
//? 500 Error del servidor
class PeliculasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var peliculas = yield database_1.default.query('SELECT * FROM peliculas');
            res.status(200).json(peliculas);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pelicula = yield database_1.default.query('SELECT * FROM peliculas WHERE id = ?', [id]);
            if (pelicula.length > 0) {
                res.status(200).json(pelicula[0]);
            }
            else {
                res.status(404).json({ message: "La pelicula no existe" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.query('INSERT INTO peliculas set ?', [req.body]);
                res.status(200).json('creando una peli');
            }
            catch (error) {
                res.status(500).json('Error al añadir la pelicula');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const borrada = yield database_1.default.query('DELETE FROM peliculas WHERE id= ?', [id]);
            res.status(200).json('El juego se ha eliminado');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE peliculas set ? WHERE id = ?', [req.body, id]);
            res.status(200).json({ text: "Actualizando la pelim" + id });
        });
    }
}
exports.peliculasController = new PeliculasController();
