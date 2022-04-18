import { Router } from 'express'
import { archivosYArticulosController } from '../controllers/ArchivoYArticuloController'

class ArchivoYArticulo {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', archivosYArticulosController.list)
		this.router.get('/:id', archivosYArticulosController.listByArticulo)
		this.router.post('/create/:idProfesor', archivosYArticulosController.create)
		this.router.delete('/delete/:idArticulo', archivosYArticulosController.delete) 
	}

}

const archivoYArticulo = new ArchivoYArticulo()
export default archivoYArticulo.router