import { Request, Response } from 'express'
import pool from '../database'

class TipoProfesorController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM tipoProfesor')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM tipoprofesor WHERE idTipoProfesor=?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Tipo de Profesor no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO tipoProfesor SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idTipoProfesor } = req.params
		const resp = await pool.query(`DELETE FROM tipoProfesor WHERE idTipoProfesor=${idTipoProfesor}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idTipoProfesor } = req.params
		const resp = await pool.query('UPDATE tipoProfesor set ? WHERE idTipoProfesor=?', [req.body, idTipoProfesor])
		res.json(resp)
	}

}

export const tipoProfesorController = new TipoProfesorController()