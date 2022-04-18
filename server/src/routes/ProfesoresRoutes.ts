import { Router } from 'express'
import { profesoresController } from '../controllers/ProfesoresController'

class ProfesoresRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config(): void {
		this.router.get('/tipoProfesor', profesoresController.tipoProfesor);
		this.router.get('/:id', profesoresController.listOne)
		this.router.post('/cambiarContrasena', profesoresController.cambiarContrasena)
		this.router.get('/', profesoresController.list)
		this.router.post('/create', profesoresController.create)
		this.router.delete('/delete/:idProfesor', profesoresController.delete)
		this.router.put('/update/:idProfesor', profesoresController.update)
		this.router.get('/profesoresByArticulo/:idArticulo', profesoresController.getProfesoresByArticulo)
		this.router.post('/existe', profesoresController.existe)
		this.router.get('/listAutorByArticulo/:idArticulo', profesoresController.listAutorByArticulo);
		this.router.get('/listProfesoresByInstituto/:idInstituto', profesoresController.listProfesoresByInstituto);
		this.router.get('/listProfesoresByCarrera/:idCarrera', profesoresController.listProfesoresByCarrera);
	}

}

const profesoresRoutes = new ProfesoresRoutes()
export default profesoresRoutes.router