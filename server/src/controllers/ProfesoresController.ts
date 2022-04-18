import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import pool from '../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

class ProfesoresController {

	constructor() {
		dotenv.config()
	}

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM profesores')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM profesores WHERE idProfesor=?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])

		} else {

			res.status(404).json({ 'mensaje': 'Profesor no encontrado' })
		}
	}

	public async existe(req: Request, res: Response): Promise<void> {
		const { correo, password } = req.body;
		let consulta = "SELECT * FROM profesores WHERE correoProfesor = '" + correo + "'";
		const respuesta = await pool.query(consulta);
		if (respuesta.length > 0) {
			bcrypt.compare(password, respuesta[0].password, (err, resEncriptar) => {
				if (resEncriptar == true) {
					const token: string = jwt.sign(correo, process.env.TOKEN_SECRET || 'prueba')
					res.json(
						{
							"idProfesor": respuesta[0].idProfesor,
							"token": token,
							"nivel": respuesta[0].nivel
						})
				}
				else {
					res.json({ "idProfesor": -1, "token": "" });
				}
			})
		}
		else
			res.json({ "idProfesor": -1, "token": "" });
	}

	public async create(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query("INSERT INTO profesores set ?",
				[req.body]);
			res.json(resp);
		})
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params
		const resp = await pool.query(`DELETE FROM profesores WHERE idProfesor=${idProfesor}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params
		const resp = await pool.query('UPDATE profesores set ? WHERE idProfesor=?', [req.body, idProfesor])
		res.json(resp)
	}

	public async cambiarContrasena(req: Request, res: Response): Promise<void> {
		const { idProfesor, password } = req.body;
		var nuevoP;
		var consulta: string;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.hash(password, salt).then(async function (nuevoPassword) {
			nuevoP = nuevoPassword;
			consulta = "UPDATE profesores SET password = '" + nuevoP + "' WHERE idProfesor = " + idProfesor;
			const resp = await pool.query(consulta);
			res.json(resp);
		})
	}

	public async getProfesorByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params
		const resp = await pool.query(`SELECT idProfesor, nombres, apellidoPaterno, apellidoMaterno FROM profesores WHERE idCarrera = ${idCarrera}`)
		res.json(resp)
	}

	public async getProfesoresByArticulo(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params
		const respuesta = await pool.query('SELECT P.nombresP, P.idProfesor FROM profesores as P INNER JOIN ArticuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', idArticulo)
		res.json(respuesta)
	}

	public async listProfesoresByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params;
		let consulta = 'SELECT * FROM profesores WHERE idCarrera = ' + idCarrera;
		console.log(consulta)
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}



	public async listAutorByArticulo(req: Request, res: Response): Promise<void> {
		//console.log("listAutorByArticulo")
		const { idArticulo } = req.params;
		let consulta = 'SELECT P.nombresP, P.idProfesor FROM Profesores P INNER JOIN ArticuloYProfesor AYP ON AYP.idProfesor=P.idProfesor WHERE idArticulo = ' + idArticulo;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}

	public async listProfesoresByInstituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params;
		let consulta = 'SELECT * FROM profesores WHERE idInstituto = ' + idInstituto;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}
	public async tipoProfesor(req: Request, res: Response): Promise<void> {
		let consulta = 'SELECT * FROM TipoProfesor ';
		console.log(consulta)
		const respuesta = await pool.query(consulta);
		res.json(respuesta);
	}
}

export const profesoresController = new ProfesoresController()