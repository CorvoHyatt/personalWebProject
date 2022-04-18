import { Request, Response } from 'express'
import pool from '../database'

class ProfesorMateriaController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM profesormateria ORDER BY año')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM profesormateria WHERE idProfesorMateria = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'MateriaProfesor no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO profesormateria SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idProfesorMateria } = req.params
		const resp = await pool.query(`DELETE FROM profesormateria WHERE idProfesorMateria=${idProfesorMateria}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idProfesorMateria } = req.params
		const resp = await pool.query('UPDATE profesormateria set ? WHERE idProfesorMateria=?', [req.body, idProfesorMateria])
		res.json(resp)
	}

}

export const profesorMateriaController = new ProfesorMateriaController()