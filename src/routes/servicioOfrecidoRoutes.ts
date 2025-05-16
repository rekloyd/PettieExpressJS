import { Router } from 'express';
import {
  getServiciosOfrecidos,
  getServicioOfrecidoPorID,
  insertServicioOfrecido,
  updateServicioOfrecido,
  deleteServicioOfrecido
} from '../controllers/ServicioOfrecidoController';

const router = Router();

// Obtener todos los servicios ofrecidos con paginación
router.get('/serviciosOfrecidos', getServiciosOfrecidos);

// Obtener un servicio ofrecido por su ID
router.get('/serviciosOfrecidos/:id', getServicioOfrecidoPorID);

// Crear un nuevo servicio ofrecido
router.post('/servicioOfrecido', insertServicioOfrecido);

// Actualizar un servicio ofrecido existente
router.put('/servicioOfrecido/:id', updateServicioOfrecido);

// Eliminar un servicio ofrecido
router.delete('/servicioOfrecido/:id', deleteServicioOfrecido);

export default router;
