import morgan from 'morgan'
import cors from 'cors'
import express, {Application} from 'express'
import swagger_ui_express from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import carrerasRoutes from './routes/CarrerasRoutes'
import institutosRoutes from './routes/InstitutosRoutes'
import ProfesoresRoutes from './routes/ProfesoresRoutes'
import TipoProfesorRoutes from './routes/TipoProfesorRoutes'
import MateriasRoutes from './routes/MateriasRoutes'
import ProfesorMateriaRoutes from './routes/ProfesorMateriaRoutes'
import PeriodoRoutes from './routes/PeriodoRoutes'
import PlanesRoutes from './routes/PlanesRoutes'
import ArticuloYProfesorRoutes from './routes/ArticuloYProfesorRoutes'
import ArticulosRoutes from './routes/ArticulosRoutes'
import ArchivoYArticuloRoutes from './routes/ArchivoYArticuloRoutes'

class Server {

	public app: Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
		this.app.use('/api/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument))
	}

	config(): void {
		this.app.set('port', process.env.PORT || 3000)
		this.app.use(morgan('dev'))
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.urlencoded({extended: false}))
	}

	routes(): void {
		this.app.use('/api/carreras', carrerasRoutes)
		this.app.use('/api/institutos', institutosRoutes)
		this.app.use('/api/profesores', ProfesoresRoutes)
		this.app.use('/api/tipoprofesor', TipoProfesorRoutes)
		this.app.use('/api/materias', MateriasRoutes)
		this.app.use('/api/planes', PlanesRoutes)
		this.app.use('/api/profesorMateria', ProfesorMateriaRoutes)
		this.app.use('/api/periodo', PeriodoRoutes)
		this.app.use('/api/articuloYProfesor', ArticuloYProfesorRoutes)
		this.app.use('/api/articulo', ArticulosRoutes)
		this.app.use('/api/archivoYArticulo', ArchivoYArticuloRoutes)
	}
	
	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port', this.app.get('port'))
		})
	}

}

const server = new Server()
server.start()
