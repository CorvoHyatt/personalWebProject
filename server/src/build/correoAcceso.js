"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var email = require("emailjs/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = (formulario) => {
    const token = jsonwebtoken_1.default.sign(formulario.email, process.env.TOKEN_SECRET || 'prueba');
    console.log(formulario.email);
    var server = email.server.connect({
        user: "apikey",
        password: "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",
        host: "smtp.sendgrid.net",
        ssl: true,
    });
    var message = {};
    message =
        {
            from: "CorvoDevOps <corvohyatt@gmail.com>",
            to: formulario.email,
            bcc: "",
            subject: "Cambio de contraseña",
            attachment: [
                {
                    data: `
						En la siguiente liga podrás cambiar tu contraseña:
						<a href="http://localhost:4200/recuperar/${token}" >RECUPERAR</a>
						`,
                    alternative: true
                }
            ]
        };
    server.send(message, function (err, message) {
        console.log("\nRespuesta del servidor Correo:");
        console.log('Error:', err);
        console.log('Respuesta', message);
    });
};
