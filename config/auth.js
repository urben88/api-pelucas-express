require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET || "trolooo",
    expires: process.env.AUTH_EXPIRES || "24h", //Pueden ser dias con 7d
    //Esto sirve para la encriptación
    rounds: process.env.AUTH_ROUNDS || 10
}