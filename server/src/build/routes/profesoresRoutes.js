"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfesoresController_1 = require("../controllers/ProfesoresController");
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/tipoProfesor', ProfesoresController_1.profesoresController.tipoProfesor);
        this.router.get('/:id', ProfesoresController_1.profesoresController.listOne);
        this.router.post('/cambiarContrasena', ProfesoresController_1.profesoresController.cambiarContrasena);
        this.router.get('/', ProfesoresController_1.profesoresController.list);
        this.router.post('/create', ProfesoresController_1.profesoresController.create);
        this.router.delete('/delete/:idProfesor', ProfesoresController_1.profesoresController.delete);
        this.router.put('/update/:idProfesor', ProfesoresController_1.profesoresController.update);
        this.router.get('/profesoresByArticulo/:idArticulo', ProfesoresController_1.profesoresController.getProfesoresByArticulo);
        this.router.post('/existe', ProfesoresController_1.profesoresController.existe);
        this.router.get('/listAutorByArticulo/:idArticulo', ProfesoresController_1.profesoresController.listAutorByArticulo);
        this.router.get('/listProfesoresByInstituto/:idInstituto', ProfesoresController_1.profesoresController.listProfesoresByInstituto);
        this.router.get('/listProfesoresByCarrera/:idCarrera', ProfesoresController_1.profesoresController.listProfesoresByCarrera);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
