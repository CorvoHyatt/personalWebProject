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
exports.profesoresController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
class ProfesoresController {
    constructor() {
        dotenv_1.default.config();
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM profesores');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM profesores WHERE idProfesor=?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
            }
            else {
                res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
            }
        });
    }
    existe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            let consulta = "SELECT * FROM profesores WHERE correoProfesor = '" + correo + "'";
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                bcryptjs_1.default.compare(password, respuesta[0].password, (err, resEncriptar) => {
                    if (resEncriptar == true) {
                        const token = jsonwebtoken_1.default.sign(correo, process.env.TOKEN_SECRET || 'prueba');
                        res.json({
                            "idProfesor": respuesta[0].idProfesor,
                            "token": token,
                            "nivel": respuesta[0].nivel
                        });
                    }
                    else {
                        res.json({ "idProfesor": -1, "token": "" });
                    }
                });
            }
            else
                res.json({ "idProfesor": -1, "token": "" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            var salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(password, salt).then(function (nuevoPassword) {
                req.body.password = nuevoPassword;
                const resp = database_1.default.query("INSERT INTO profesores set ?", [req.body]);
                res.json(resp);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM profesores WHERE idProfesor=${idProfesor}`);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query('UPDATE profesores set ? WHERE idProfesor=?', [req.body, idProfesor]);
            res.json(resp);
        });
    }
    cambiarContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor, password } = req.body;
            var nuevoP;
            var consulta;
            var salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(password, salt).then(function (nuevoPassword) {
                return __awaiter(this, void 0, void 0, function* () {
                    nuevoP = nuevoPassword;
                    consulta = "UPDATE profesores SET password = '" + nuevoP + "' WHERE idProfesor = " + idProfesor;
                    const resp = yield database_1.default.query(consulta);
                    res.json(resp);
                });
            });
        });
    }
    getProfesorByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query(`SELECT idProfesor, nombres, apellidoPaterno, apellidoMaterno FROM profesores WHERE idCarrera = ${idCarrera}`);
            res.json(resp);
        });
    }
    getProfesoresByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            const respuesta = yield database_1.default.query('SELECT P.nombresP, P.idProfesor FROM profesores as P INNER JOIN ArticuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', idArticulo);
            res.json(respuesta);
        });
    }
    listProfesoresByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            let consulta = 'SELECT * FROM profesores WHERE idCarrera = ' + idCarrera;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    listAutorByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("listAutorByArticulo")
            const { idArticulo } = req.params;
            let consulta = 'SELECT P.nombresP, P.idProfesor FROM Profesores P INNER JOIN ArticuloYProfesor AYP ON AYP.idProfesor=P.idProfesor WHERE idArticulo = ' + idArticulo;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    listProfesoresByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            let consulta = 'SELECT * FROM profesores WHERE idInstituto = ' + idInstituto;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    tipoProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let consulta = 'SELECT * FROM TipoProfesor ';
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
}
exports.profesoresController = new ProfesoresController();
