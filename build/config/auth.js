"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    secret: process.env.AUTH_SECRET || "trolooo",
    expires: process.env.AUTH_EXPIRES || "24h",
    //Esto sirve para la encriptación
    rounds: process.env.AUTH_ROUNDS || 10
};
