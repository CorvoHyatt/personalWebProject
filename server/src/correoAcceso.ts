var email = require("emailjs/email");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (formulario: any) => {
	const token: string = jwt.sign(formulario.email, process.env.TOKEN_SECRET || 'prueba');
	console.log(formulario.email)
	var server = email.server.connect({
		user: "apikey",
		password: "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",
		host: "smtp.sendgrid.net",
		ssl: true,
	});

	var message: any = {};

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
	server.send(message, function (err: any, message: any) { 
		console.log("\nRespuesta del servidor Correo:")
		console.log('Error:', err)
		console.log('Respuesta', message)
	});
}