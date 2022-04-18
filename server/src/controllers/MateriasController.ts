import { Request, Response } from 'express'
import pool from '../database'

class MateriasController {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM materias ORDER BY nombreMateria')
		res.json(respuesta)
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM materias WHERE idMateria = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Materia no encontrado' })
	}

	public async create(req:Request, res: Response): Promise<void> {
		const resp = await pool.query('INSERT INTO materias SET ?', [req.body])
		res.json(resp)
	}

	public async delete(req:Request, res: Response): Promise<void> {
		const { idMateria } = req.params
		const resp = await pool.query(`DELETE FROM materias WHERE idMateria=${idMateria}`)
		res.json(resp)
	}

	public async update(req: Request, res: Response): Promise<void> {
		const { idMateria } = req.params
		const resp = await pool.query('UPDATE materias set ? WHERE idMateria=?', [req.body, idMateria])
		res.json(resp)
	}

	public async getMateriasByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params
		const resp = await pool.query('SELECT nombreMateria FROM materias WHERE idCarrera=?', idCarrera)
		if (resp.length > 0) {
			res.json(resp[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Materia no encontrada' })
	}

}

export const materiasController = new MateriasController()