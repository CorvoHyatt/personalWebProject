import { Request, Response } from 'express'
import pool from '../database'

class ActividadesController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM actividades order by idActividad')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM actividades WHERE idActividad = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Actividad no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO actividades SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idEvento } = req.params
		const resp = await pool.query(`DELETE FROM actividades WHERE idActividad=${idEvento}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idEvento } = req.params
		const resp = await pool.query('UPDATE actividades set ? WHERE idActividad=?', [req.body, idEvento])
		res.json(resp)
	}

	public async getActividadesByProfesor(req: Request, res: Response): Promise<void> {
		const { idProfesor, fechaIni, fechaFin } = req.params
		let respuesta = await pool.query(`SELECT * FROM actividades WHERE idProfesor=${idProfesor} AND inicio>='${fechaIni}' AND fin<='${fechaFin}'`)
		res.json(respuesta)
	}

}

export const actividadesController = new ActividadesController()