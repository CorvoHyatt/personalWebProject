"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArchivoYArticuloController_1 = require("../controllers/ArchivoYArticuloController");
class ArchivoYArticulo {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ArchivoYArticuloController_1.archivosYArticulosController.list);
        this.router.get('/:id', ArchivoYArticuloController_1.archivosYArticulosController.listByArticulo);
        this.router.post('/create/:idProfesor', ArchivoYArticuloController_1.archivosYArticulosController.create);
        this.router.delete('/delete/:idArticulo', ArchivoYArticuloController_1.archivosYArticulosController.delete);
    }
}
const archivoYArticulo = new ArchivoYArticulo();
exports.default = archivoYArticulo.router;
