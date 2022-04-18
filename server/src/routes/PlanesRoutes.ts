import { Router } from 'express'
import { planesController } from '../controllers/PlanesController'

class PlanesRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', planesController.list)
		this.router.get('/:id', planesController.listOne)
		this.router.post('/create', planesController.create)
		this.router.delete('/delete/:idMateria', planesController.delete)
		this.router.put('/update/:idMateria', planesController.update)
		this.router.get('/planesByCarrera', planesController.getPlanesByCarrera)
	}

}

const planesRoutes = new PlanesRoutes()
export default planesRoutes.router