"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticuloYProfesorController_1 = require("../controllers/ArticuloYProfesorController");
class ArticuloYProfesorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ArticuloYProfesorController_1.articuloYProfesorController.list);
        this.router.get('/:id', ArticuloYProfesorController_1.articuloYProfesorController.listOne);
        this.router.post('/create', ArticuloYProfesorController_1.articuloYProfesorController.create);
        this.router.delete('/delete/:idArticuloYProfesor', ArticuloYProfesorController_1.articuloYProfesorController.delete);
        this.router.put('/update/:idArticuloYProfesor', ArticuloYProfesorController_1.articuloYProfesorController.update);
        // this.router.get('/profesoresByArticulo/:idArticulo', articuloYProfesorController.profesoresByArticulo)
        this.router.get('/articulosByCarrera/:idCarrera', ArticuloYProfesorController_1.articuloYProfesorController.articulosByCarrera);
    }
}
const articuloYProfesorRoutes = new ArticuloYProfesorRoutes();
exports.default = articuloYProfesorRoutes.router;
