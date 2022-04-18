import { Router } from 'express'
import { profesorMateriaController } from '../controllers/ProfesorMateriaController'

class ProfesorMateriaRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', profesorMateriaController.list)
		this.router.get('/:id', profesorMateriaController.listOne)
		this.router.post('/create', profesorMateriaController.create)
		this.router.delete('/delete/:idMateria', profesorMateriaController.delete)
		this.router.put('/update/:idMateria', profesorMateriaController.update)
	}

}

const profesorMateriaRoutes = new ProfesorMateriaRoutes()
export default profesorMateriaRoutes.router