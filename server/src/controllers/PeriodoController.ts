import { Request, Response } from 'express'
import pool from '../database'

class PeriodoController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM periodo ORDER BY inicio')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM periodo WHERE idPeriodo = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Periodo no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO periodo SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idPeriodo } = req.params
		const resp = await pool.query(`DELETE FROM periodo WHERE idProfesorMateria=${idPeriodo}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idPeriodo } = req.params
		const resp = await pool.query('UPDATE periodo set ? WHERE idPeriodo=?', [req.body, idPeriodo])
		res.json(resp)
	}

}

export const periodoController = new PeriodoController()