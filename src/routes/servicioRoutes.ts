import { Router } from 'express';
import {
  getServicios,
  getServicioPorID,
  insertServicio,
  updateServicio,
  deleteServicio,
  getServiciosFiltered
} from '../controllers/ServicioController';

const router = Router();

// Obtener todos los servicios
router.get('/servicios', getServicios);

//Obetener servicios con filtros flexibles
router.get('/servicios/filtered', getServiciosFiltered);

// Obtener un servicio por ID
router.get('/servicios/:id', getServicioPorID);

// Crear un nuevo servicio
router.post('/servicio', insertServicio);

// Actualizar un servicio existente
router.put('/servicio/:id', updateServicio);

// Eliminar un servicio
router.delete('/servicio/:id', deleteServicio);

export default router;
