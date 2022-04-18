import { Request, Response } from 'express'
import pool from '../database'

class ArchivoYArticulo {

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM archivoYArticulo order by idArticulo')
		res.json(respuesta)
	}

	public async listByArticulo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const respuesta = await pool.query('SELECT * FROM archivoYArticulo WHERE idArticulo = ?', [id])
		if (respuesta.length > 0) {
			res.json(respuesta[0])
			return;
		}
		res.status(404).json({ 'mensaje': 'Articulo no encontrado' })
	}

	public async create(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params
		const resp = await pool.query('INSERT INTO archivoYArticulo SET ?', [req.body])

	}

	public async delete(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params
		const resp = await pool.query(`DELETE FROM articulo WHERE idArticulo=${idArticulo}`)
		res.json(resp)
	}
}

export const archivosYArticulosController = new ArchivoYArticulo()