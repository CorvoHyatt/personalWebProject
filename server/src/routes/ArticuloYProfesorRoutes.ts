import { Router } from 'express'
import 	{ articuloYProfesorController } from '../controllers/ArticuloYProfesorController'

class ArticuloYProfesorRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', articuloYProfesorController.list)
		this.router.get('/:id', articuloYProfesorController.listOne)
		this.router.post('/create', articuloYProfesorController.create)
		this.router.delete('/delete/:idArticuloYProfesor', articuloYProfesorController.delete)
		this.router.put('/update/:idArticuloYProfesor', articuloYProfesorController.update)
		this.router.get('/profesoresByArticulo/:idArticulo', articuloYProfesorController.profesoresByArticulo)
		this.router.get('/articulosByCarrera/:idCarrera', articuloYProfesorController.articulosByCarrera)
	}

}

const articuloYProfesorRoutes = new ArticuloYProfesorRoutes()
export default articuloYProfesorRoutes.router