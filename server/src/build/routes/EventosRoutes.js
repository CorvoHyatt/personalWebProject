"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventosController_1 = require("../controllers/EventosController");
class EventosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', EventosController_1.eventosController.list);
        this.router.get('/:id', EventosController_1.eventosController.listOne);
        this.router.post('/create', EventosController_1.eventosController.create);
        this.router.delete('/delete/:idArticulo', EventosController_1.eventosController.delete);
        this.router.put('/update/:idArticulo', EventosController_1.eventosController.update);
        this.router.get('/eventosByProfesor/:idProfesor/:fechaIni/:fechaFin', EventosController_1.eventosController.getEventosByProfesor);
    }
}
const eventosRoutes = new EventosRoutes();
exports.default = eventosRoutes.router;
