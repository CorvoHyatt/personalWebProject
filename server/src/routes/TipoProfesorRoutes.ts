import { Router } from 'express'
import { tipoProfesorController } from '../controllers/TipoProfesorController'

class ProfesoresRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', tipoProfesorController.list)
		this.router.get('/:id', tipoProfesorController.listOne)
		this.router.post('/create', tipoProfesorController.create)
		this.router.delete('/delete/:idTipoProfesor', tipoProfesorController.delete)
		this.router.put('/update/:idTipoProfesor', tipoProfesorController.update)
	}

}

const profesoresRoutes = new ProfesoresRoutes()
export default profesoresRoutes.router