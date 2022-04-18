import { Router } from 'express'
import { periodoController } from '../controllers/PeriodoController'

class PeriodoRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', periodoController.list)
		this.router.get('/:id', periodoController.listOne)
		this.router.post('/create', periodoController.create)
		this.router.delete('/delete/:idPeriodo', periodoController.delete)
		this.router.put('/update/:idPeriodo', periodoController.update)
	}

}

const periodoRoutes = new PeriodoRoutes()
export default periodoRoutes.router