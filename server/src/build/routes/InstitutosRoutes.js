"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InstitutosController_1 = require("../controllers/InstitutosController");
class InstitutosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', InstitutosController_1.institutosController.list);
        this.router.get('/:id', InstitutosController_1.institutosController.listOne);
        this.router.post('/create', InstitutosController_1.institutosController.create);
        this.router.delete('/delete/:idInstituto', InstitutosController_1.institutosController.delete);
        this.router.put('/update/:idInstituto', InstitutosController_1.institutosController.update);
    }
}
const institutosRoutes = new InstitutosRoutes();
exports.default = institutosRoutes.router;
