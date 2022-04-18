import { Request, Response } from 'express'
import pool from '../database'

class PlanesController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM planes ORDER BY nombrePlan')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM planes WHERE idPlan = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Plan no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO planes SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idPlan } = req.params
		const resp = await pool.query(`DELETE FROM planes WHERE idPlan=${idPlan}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idPlan } = req.params
		const resp = await pool.query('UPDATE planes set ? WHERE idPlan=?', [req.body, idPlan])
		res.json(resp)
	}

	public async getPlanesByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params
		const resp = await pool.query('SELECT nombrePlan FROM planes WHERE idCarrera=?', idCarrera)
		if (resp.length > 0) {
			res.json(resp[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Plan no encontrado' })
	}

}

export const planesController = new PlanesController()