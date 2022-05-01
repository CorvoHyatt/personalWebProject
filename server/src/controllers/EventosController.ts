import { Request, Response } from 'express'
import pool from '../database'

class EventosController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM eventos order by idEvento')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM eventos WHERE idEvento = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Evento no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO eventos SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idEvento } = req.params
		const resp = await pool.query(`DELETE FROM eventos WHERE idEvento=${idEvento}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idEvento } = req.params
		const resp = await pool.query('UPDATE eventos set ? WHERE idEvento=?', [req.body, idEvento])
		res.json(resp)
	}

	public async getEventosByProfesor(req: Request, res: Response): Promise<void> {
		const { idProfesor, fechaIni, fechaFin } = req.params
		let respuesta = await pool.query(`SELECT * FROM eventos WHERE idProfesor=${idProfesor} AND inicio>='${fechaIni}' AND fin<='${fechaFin}'`)
		res.json(respuesta)
	}

}

export const eventosController = new EventosController()