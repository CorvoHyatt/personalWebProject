"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articulosController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticulosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM articulo order by idArticulo');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM articulo WHERE idArticulo = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    getArticulosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            let respuesta = yield database_1.default.query('SELECT * FROM articulo as A INNER JOIN articuloYProfesor AP ON AP.idArticulo=A.idArticulo INNER JOIN profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto);
            // Obtener los profesores participantes
            for (let i = 0; i < respuesta.length; i++) {
                const respuesta2 = yield database_1.default.query('SELECT * FROM profesores as P INNER JOIN articuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=? ORDER BY AP.pos', respuesta[i].idArticulo);
                respuesta[i].profesores = respuesta2;
            }
            res.json(respuesta);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query('INSERT INTO articulo SET ?', [req.body]);
            console.log(idProfesor);
            const json = {
                "idProfesor": idProfesor,
                "idArticulo": resp.insertId,
                "pos": 1,
                "valido": "si"
            };
            const resp2 = yield database_1.default.query('INSERT INTO articuloYProfesor SET ?', json);
            res.json(resp2);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM articulo WHERE idArticulo=${idArticulo}`);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            const resp = yield database_1.default.query('UPDATE articulo set ? WHERE idArticulo=?', [req.body, idArticulo]);
            res.json(resp);
        });
    }
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM articulo A INNER JOIN articuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    getArticulosByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, fechaIni, fechaFin } = req.params;
            console.log(idProfesor, fechaIni, fechaFin);
            const respuesta = yield database_1.default.query(`SELECT * FROM articulo as A INNER JOIN articuloYProfesor AP ON AP.idArticulo=A.idArticulo 
		WHERE AP.idProfesor = ${idProfesor} AND fechaEdicion >= "${fechaIni}" AND fechaEdicion <= "${fechaFin}" ORDER BY fechaEdicion`);
            res.json(respuesta);
        });
    }
    listByidProfesorIniFin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByidProfesorIniFin");
            const { idProfesor, fechaIni, fechaFin } = req.params;
            let consulta = `SELECT A.idArticulo,A.titulo, A.fechaEdicion as fecha  from articulo A INNER JOIN articuloYProfesor PA ON PA.idArticulo = A.idArticulo INNER JOIN profesores P ON P.idProfesor=PA.idProfesor WHERE  P.idProfesor = ${idProfesor} AND fechaEdicion>="${fechaIni}" AND fechaEdicion<="${fechaFin}" ORDER BY fechaEdicion`;
            const respuesta = yield database_1.default.query(consulta);
            for (let data of respuesta) {
                let consultaAutores = 'SELECT PA.idProfesor, P.nombresP, P.apellidoP, P.apellidoM, PA.idArticulo, PA.pos, PA.valido FROM articulo A  INNER JOIN articuloYProfesor PA ON A.idArticulo=PA.idArticulo  INNER JOIN profesores P ON P.idProfesor=PA.idProfesor WHERE PA.idArticulo=' + data.idArticulo + " ORDER BY PA.pos";
                const respuestaAutores = yield database_1.default.query(consultaAutores);
                data.autores = respuestaAutores;
            }
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaIni, fechaFin } = req.params;
            const respuesta = yield database_1.default.query(`SELECT * FROM articulo WHERE fechaEdicion >= "${fechaIni}" AND fechaEdicion <= "${fechaFin}"`);
            if (respuesta.length > 0) {
                console.log(respuesta.length);
                res.json(respuesta);
                return;
            }
            res.json({ 'mensaje': 'Articulos no encontrados' });
        });
    }
}
exports.articulosController = new ArticulosController();
