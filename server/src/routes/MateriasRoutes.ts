import { Router } from 'express'
import { materiasController } from '../controllers/MateriasController'

class MateriasRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', materiasController.list)
		this.router.get('/:id', materiasController.listOne)
		this.router.post('/create', materiasController.create)
		this.router.delete('/delete/:idMateria', materiasController.delete)
		this.router.put('/update/:idMateria', materiasController.update)
		this.router.get('/materiasByCarrera', materiasController.getMateriasByCarrera)
	}

}

const materiasRoutes = new MateriasRoutes()
export default materiasRoutes.router