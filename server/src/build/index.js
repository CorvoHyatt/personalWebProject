"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const CarrerasRoutes_1 = __importDefault(require("./routes/CarrerasRoutes"));
const InstitutosRoutes_1 = __importDefault(require("./routes/InstitutosRoutes"));
const ProfesoresRoutes_1 = __importDefault(require("./routes/ProfesoresRoutes"));
const TipoProfesorRoutes_1 = __importDefault(require("./routes/TipoProfesorRoutes"));
const MateriasRoutes_1 = __importDefault(require("./routes/MateriasRoutes"));
const ProfesorMateriaRoutes_1 = __importDefault(require("./routes/ProfesorMateriaRoutes"));
const PeriodoRoutes_1 = __importDefault(require("./routes/PeriodoRoutes"));
const PlanesRoutes_1 = __importDefault(require("./routes/PlanesRoutes"));
const ArticuloYProfesorRoutes_1 = __importDefault(require("./routes/ArticuloYProfesorRoutes"));
const ArticulosRoutes_1 = __importDefault(require("./routes/ArticulosRoutes"));
const ArchivoYArticuloRoutes_1 = __importDefault(require("./routes/ArchivoYArticuloRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.app.use('/api/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/carreras', CarrerasRoutes_1.default);
        this.app.use('/api/institutos', InstitutosRoutes_1.default);
        this.app.use('/api/profesores', ProfesoresRoutes_1.default);
        this.app.use('/api/tipoprofesor', TipoProfesorRoutes_1.default);
        this.app.use('/api/materias', MateriasRoutes_1.default);
        this.app.use('/api/planes', PlanesRoutes_1.default);
        this.app.use('/api/profesorMateria', ProfesorMateriaRoutes_1.default);
        this.app.use('/api/periodo', PeriodoRoutes_1.default);
        this.app.use('/api/articuloYProfesor', ArticuloYProfesorRoutes_1.default);
        this.app.use('/api/articulo', ArticulosRoutes_1.default);
        this.app.use('/api/archivoYArticulo', ArchivoYArticuloRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
