import { Request, Response } from 'express'
import pool from '../database'

class ArticulosController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM articulo order by idArticulo')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM articulo WHERE idArticulo = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Articulo no encontrado' })
	}

	public async getArticulosByInstituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params
		let respuesta = await pool.query('SELECT * FROM articulo as A INNER JOIN articuloYProfesor AP ON AP.idArticulo=A.idArticulo INNER JOIN profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto)
		// Obtener los profesores participantes
		for (let i = 0; i < respuesta.length; i++) {
			const respuesta2 = await pool.query('SELECT * FROM profesores as P INNER JOIN articuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=? ORDER BY AP.pos', respuesta[i].idArticulo)
			respuesta[i].profesores = respuesta2
		}

		res.json(respuesta)
	}


	public async create(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params
		const resp = await pool.query('INSERT INTO articulo SET ?', [req.body])
		console.log(idProfesor)
		const json = {
			"idProfesor": idProfesor,
			"idArticulo": resp.insertId,
			"pos": 1,
			"valido": "si"
		}
		const resp2 = await pool.query('INSERT INTO articuloYProfesor SET ?', json)
		res.json(resp2)
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params
		const resp = await pool.query(`DELETE FROM articulo WHERE idArticulo=${idArticulo}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params
		const resp = await pool.query('UPDATE articulo set ? WHERE idArticulo=?', [req.body, idArticulo])
		res.json(resp)
	}
	public async listByProfesor(req: Request, res: Response): Promise<void> {
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM articulo A INNER JOIN articuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
		res.json(respuesta);
	}

	public async getArticulosByProfesor(req: Request, res: Response): Promise<void> {
		const { idProfesor, fechaIni, fechaFin } = req.params

		console.log(idProfesor, fechaIni, fechaFin);
		const respuesta = await pool.query(`SELECT * FROM articulo as A INNER JOIN articuloYProfesor AP ON AP.idArticulo=A.idArticulo 
		WHERE AP.idProfesor = ${idProfesor} AND fechaEdicion >= "${fechaIni}" AND fechaEdicion <= "${fechaFin}" ORDER BY fechaEdicion`)
		res.json(respuesta)
	}

	public async listByidProfesorIniFin(req: Request, res: Response): Promise<void> {
		console.log("listByidProfesorIniFin");
		const { idProfesor, fechaIni, fechaFin } = req.params;
		let consulta = `SELECT A.idArticulo,A.titulo, A.fechaEdicion as fecha  from articulo A INNER JOIN articuloYProfesor PA ON PA.idArticulo = A.idArticulo INNER JOIN profesores P ON P.idProfesor=PA.idProfesor WHERE  P.idProfesor = ${idProfesor} AND fechaEdicion>="${fechaIni}" AND fechaEdicion<="${fechaFin}" ORDER BY fechaEdicion`;
		const respuesta = await pool.query(consulta);
		for (let data of respuesta) {
			let consultaAutores = 'SELECT PA.idProfesor, P.nombresP, P.apellidoP, P.apellidoM, PA.idArticulo, PA.pos, PA.valido FROM articulo A  INNER JOIN articuloYProfesor PA ON A.idArticulo=PA.idArticulo  INNER JOIN profesores P ON P.idProfesor=PA.idProfesor WHERE PA.idArticulo=' + data.idArticulo + " ORDER BY PA.pos";
			const respuestaAutores = await pool.query(consultaAutores);
			data.autores = respuestaAutores;
		}
		res.json(respuesta);
	}
	public async listByPeriodo(req: Request, res: Response): Promise<void> {
		const { fechaIni, fechaFin } = req.params;
		const respuesta = await pool.query(`SELECT * FROM articulo WHERE fechaEdicion >= "${fechaIni}" AND fechaEdicion <= "${fechaFin}"`)
		if (respuesta.length > 0) {
			console.log(respuesta.length)
			res.json(respuesta)
			return;
		}
		res.json({ 'mensaje': 'Articulos no encontrados' })
	}

}

export const articulosController = new ArticulosController()