"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivoYArticuloController_1 = require("../controllers/archivoYArticuloController");
class ArchivoYArticulo {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', archivoYArticuloController_1.archivosYArticulosController.list);
        this.router.get('/:id', archivoYArticuloController_1.archivosYArticulosController.listByArticulo);
        this.router.post('/create/:idProfesor', archivoYArticuloController_1.archivosYArticulosController.create);
        this.router.delete('/delete/:idArticulo', archivoYArticuloController_1.archivosYArticulosController.delete);
    }
}
const archivoYArticulo = new ArchivoYArticulo();
exports.default = archivoYArticulo.router;
