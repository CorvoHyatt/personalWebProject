import { Router } from 'express'
import 	{ articulosController } from '../controllers/ArticulosController'

class ArticulosRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/:idProfesor', articulosController.listByProfesor)
		this.router.get('/articulosByInstituto/:idInstituto', articulosController.getArticulosByInstituto)
		this.router.get('/:fechaIni/:fechaFin', articulosController.listByPeriodo)
		this.router.get('/', articulosController.list)
		this.router.get('/:id', articulosController.listOne)
		this.router.post('/create/:idProfesor', articulosController.create)
		this.router.delete('/delete/:idArticulo', articulosController.delete) 
		this.router.get('/:idProfesor/:fechaIni/:fechaFin', articulosController.listByidProfesorIniFin)
		this.router.put('/update/:idArticulo', articulosController.update)
	}

}

const articulosRoutes = new ArticulosRoutes()
export default articulosRoutes.router