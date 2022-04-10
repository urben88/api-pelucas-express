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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
//?Modelos
const { User } = require('../database/models');
//Todo Tipos de status a usar
//? 200 OK 201 Se ha creado
//? 404 No se encontro 401 No tienes acceso
//? 500 Error del servidor
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User.findAll({ include: ["posts", "roles"] }).then((users) => {
                if (users.length != 0) {
                    res.status(200).json(users);
                }
                else {
                    res.status(404).json({ msg: "No hay usuarios" });
                }
            }).catch((error) => {
                res.status(500).json(error);
            });
        });
    }
}
exports.userController = new UserController();
